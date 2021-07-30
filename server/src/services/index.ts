import EmailService from "./email";
import SMSService from "./sms";
import AUSPOSTService from "./ausPost";
import ClaimService from "./claim";

const initServices = (config: Config): Services => {
  return {
    email: new EmailService(config.email.support),
    sms: new SMSService(config.sms),
    ausPost: new AUSPOSTService(config),
    claim: new ClaimService(config)
  };
};

export default initServices;
