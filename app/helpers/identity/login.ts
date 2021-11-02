import config from "../../config.dev.json";
import { post } from "../http";

export const sendIdentity = async (body: server.IdentityResponseBody) => {
  console.log(body);
  post<server.IdentityResponseBody>(`${config.identity.endpoint}`, body);
}
