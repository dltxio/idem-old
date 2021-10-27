import axios, { AxiosInstance } from "axios";
import { Buffer } from "buffer";

const ausPostRequst: server.AusPostRequest = {
  given_name: "",
  middle_name: undefined,
  family_name: "",
  dob: "",
  address: {
    unit_number: "",
    street_name: "",
    street_number: "",
    street_type: "",
    locality: "",
    region: "",
    postal_code: "",
    country: ""
  },
  consent: ""
};
export default class AusPostService implements ausPostService.AusPostService {
  private client: AxiosInstance;
  constructor(config: Config) {
    this.client = axios.create({
      baseURL: config.ausPost.apiURL,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            config.ausPost.clientId + ":" + config.ausPost.clientSecret
          ).toString("base64")
      }
    });
  }

  public sendVerification = async (
    data: server.ClaimRequest
  ): Promise<server.SuccessResponse> => {
    //Mapping claims to body
    const ausPostRequest = this.wrapperAusPostRequestBody(data);
    //TODO: Got problem with auspost api, need to fix
    const response = await this.client.post<server.AusPostResponse>(
      "",
      ausPostRequest
    );

    //TODO: need logic how we gone handle response from aus post
    if (response.status === 200) {
      if (response.data.verification_status === "completed") {
        return { success: true };
      }
      return { success: false };
    } else {
      return { success: false };
    }
  };

  private wrapperAusPostRequestBody = (
    data: server.ClaimRequest
  ): server.AusPostRequest => {
    ausPostRequst.family_name = "";
    ausPostRequst.middle_name = ""
    ausPostRequst.given_name = data.name;
    ausPostRequst.dob = data.dob;
    ausPostRequst.address.country = "";
    ausPostRequst.address.locality = "";
    ausPostRequst.address.postal_code = "";
    ausPostRequst.address.region = "";
    ausPostRequst.address.street_name = data.address;
    ausPostRequst.address.street_number = "";
    ausPostRequst.address.street_type = "";
    ausPostRequst.address.unit_number = "";
    ausPostRequst.consent = "true";

    return ausPostRequst;
  };
}
