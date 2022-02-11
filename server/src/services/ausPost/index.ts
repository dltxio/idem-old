import axios, { AxiosInstance } from "axios";
import { Buffer } from "buffer";

const ausPostRequst: ausPostService.AusPostRequest = {
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
    const response = await this.client.post<ausPostService.AusPostResponse>(
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
  ): ausPostService.AusPostRequest => {
    ausPostRequst.family_name = data.lastName;
    ausPostRequst.middle_name = data.middleName;
    ausPostRequst.given_name = data.firstName;
    ausPostRequst.dob = data.dob;
    ausPostRequst.address.country = data.country;
    ausPostRequst.address.locality = data.locality;
    ausPostRequst.address.postal_code = data.postCode;
    ausPostRequst.address.region = data.region;
    ausPostRequst.address.street_name = data.streetName;
    ausPostRequst.address.street_number = data.streetNumber;
    ausPostRequst.address.street_type = data.streetType;
    ausPostRequst.address.unit_number = data.unitNumber;
    ausPostRequst.consent = "true";

    return ausPostRequst;
  };
}
