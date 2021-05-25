declare namespace server {
  type RequestPhoneVerificationSMSRequestBody = {
    number: string;
  };

  type VerifyPhoneRequestBody = {
    number: string;
    code: string;
  };
}
