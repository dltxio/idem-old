import config from "../../config.dev.json";
import { put } from "../http";

export const sendEmailVerificationEmail = async (
  body: server.SendEmailVerificationEmailRequestBody,
) => put<server.SuccessResponse>(`${config.email.endpoint}`, body);
