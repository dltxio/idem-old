import config from "../../config.dev.json";
import axios from "axios";

export const sendMobileCode = async (number: string) => {
  return await axios.put(`${config.mobile.endpoint}`, { number });
};

export const verifyMobileCode = async (number: string, code: string) => {
  const response = await axios.post(`${config.mobile.endpoint}`, {
    number,
    code,
  });
  if (response.data == null)
    throw new Error(`Could not verify with "${config.mobile.endpoint}"`);
  return response.data;
};
