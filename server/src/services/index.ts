import EmailService from "./email";
import SMSService from "./sms";
import AUSPOSTService from "./ausPost";

const initServices = (config: Config): Services => {
  return {
    email: new EmailService(config.email.support),
    sms: new SMSService(config.sms),
    ausPost: new AUSPOSTService(config)
  };
};

export default initServices;
