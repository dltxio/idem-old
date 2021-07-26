import { badRequest } from "./../../utils/errors";
import axios, { AxiosInstance } from "axios";
import { v4 as uuidv4 } from "uuid";

export default class ThirdPartyService
  implements thirdPartyService.ThirdPartyService
{
  private client: AxiosInstance;
  constructor(config: Config) {
    this.client = axios.create({
      baseURL: config.gpib,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public authorizeGPIB = async (
    claims: server.Claim[]
  ): Promise<server.SuccessResponse | server.BadRequestGeneralResponse> => {
    if (claims.length === 0) {
      return badRequest("At least have one claim");
    }

    let credentials: Array<server.Credential> = [];
    let evidences: Array<server.Evidence> = [];

    for (let claim of claims) {
      const credential: server.Credential = {
        key: claim.key,
        type: claim.type,
        value: claim.value
      };

      credentials.push(credential);

      const evidence: server.Evidence = {
        key: claim.key,
        type: claim.type,
        verifier: "string",
        evidenceDocument: "string",
        documentPresence: "string",
        timeStamp: new Date(),
        signature: claim.evidence[0]
      };

      evidences.push(evidence);
    }

    const verifiableCredential: server.VerifiableCredential = {
      id: uuidv4(),
      type: "",
      issuer: "GPIB",
      issuerDate: new Date(),
      credential: credentials,
      evidences: evidences,
      signature: ""
    };
    const sendClaims: server.JwtCredentialPayload = {
      verifiableCredential: verifiableCredential,
      subject: "",
      nonce: 0
    };

    const response = await this.client.post("/user/idem", sendClaims);
    if (response && response.status === 200) {
      return { success: true };
    }
    return { success: false };
  };
}
