type Config = {
  port: number;
  email: {
    support: {
      address: string;
      password: string;
    };
  };
  sms: {
    messageBird: {
      accessKey: string;
    };
    originator: string;
    phoneNumberVerificationMessage: (code: string) => string;
  };
  verificationCodeLength: number;
};
