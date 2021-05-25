declare namespace server {
  type SendEmailVerificationEmailRequestBody = {
    email: string;
  };

  type VerifyEmailRequestBody = {
    email: string;
    code: string;
  };
}
