import crypto from "crypto";
import moment from "moment";
import config from "../../config.json";

export default (number: string) => {
  const today = moment().startOf("day");
  const cipher = crypto.createHmac(
    "sha256",
    process.env.CIPHER_SECRET + today.toString()
  );
  cipher.update(number);
  const result = cipher.digest("hex");
  return result.slice(0, config.sms.codeLength);
};
