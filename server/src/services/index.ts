import EmailService from "./email";
import SMSService from "./sms";

const initServices = (config: Config): Services => {
  return {
    email: new EmailService(config.email.support),
    sms: new SMSService(config.sms)
  };
};

export default initServices;
