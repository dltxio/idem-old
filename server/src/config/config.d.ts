type Config = {
  port: number;
  messageBird: {
    accessKey: string;
  };
  email: {
    support: {
      address: string;
      password: string;
    };
  };
  phoneNumberVerification: {
    codeLength: number;
    originator: string;
    smsMessage: (code: string) => string;
  };
};
