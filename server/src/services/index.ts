import EmailService from "./email";
import SMSService from "./sms";
import ThirdPartyService from "./thirdParty";

const initServices = (config: Config): Services => {
  return {
    email: new EmailService(config.email.support),
    sms: new SMSService(config.sms),
    thirdParty: new ThirdPartyService(config)
  };
};

export default initServices;
