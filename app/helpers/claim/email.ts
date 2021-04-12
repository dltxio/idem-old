import config from "../../config.dev.json";
import { put } from "../http";

export const sendEmailVerificationEmail = async (
  email: server.SendEmailVerificationEmailRequestBody,
) => put<server.SuccessResponse>(`${config.email.endpoint}`, { email });
