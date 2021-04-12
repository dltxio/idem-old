import EmailService from "./email";

const initServices = (config: Config): Services => {
  return {
    email: new EmailService(config.email.support)
  };
};

export default initServices;
