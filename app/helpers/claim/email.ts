import config from "../../config.dev.json";
import axios from "axios";

export const sendEmailVerificationEmail = async (email: string) => {
  return axios.put(`${config.email.endpoint}`, { email });
};
