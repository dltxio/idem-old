import axios, { AxiosInstance } from "axios";
import { Buffer } from "buffer";

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
    data: server.Claims
  ): Promise<server.SuccessResponse> => {
    const claims = data.claims;
    const address = claims.find(v => v.key === "0x05");
    const dob = claims.find(v => v.key === "0x01");
    const fullName = claims.find(v => v.key === "0x02");
    //TODO mapping claims to body
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

    const fullNames = fullName?.value.split("/"); //TODO using "/" to split address string, we can change it
    if (fullNames && fullNames.length === 2) {
      ausPostRequst.given_name = fullNames[0];
      ausPostRequst.family_name = fullNames[1];
      ausPostRequst.middle_name = "";
    } else if (fullNames && fullNames.length === 3) {
      ausPostRequst.given_name = fullNames[0];
      ausPostRequst.middle_name = fullNames[1];
      ausPostRequst.family_name = fullNames[2];
    }
    ausPostRequst.dob = dob?.value;

    const addresses = address?.value.split("/");
    const addressObject: server.Address = {
      unit_number: "",
      street_name: "",
      street_number: "",
      street_type: "",
      locality: "",
      region: "",
      postal_code: "",
      country: ""
    };
    if (addresses && addresses.length > 0) {
      addressObject.unit_number = addresses[0];
      addressObject.street_number = addresses[1];
      addressObject.street_name = addresses[2];
      addressObject.street_type = addresses[3];
      addressObject.locality = addresses[4];
      addressObject.region = addresses[5];
      addressObject.postal_code = addresses[6];
      addressObject.country = addresses[7];
    }
    ausPostRequst.address = addressObject;
    ausPostRequst.consent = "true";

    //TODO: Got problem with auspost api, need to fix
    const response = this.client.post<server.AusPostResponse>(
      "",
      ausPostRequst
    );

    //TODO: need logic how we gone handle response from aus post
    return { success: true };
  };
}
