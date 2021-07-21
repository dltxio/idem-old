declare namespace emailService {
  type EmailTemplate = "emailVerification" | "signedEmailVerification";

  type EmailTemplateGenerators = { [k in EmailTemplate]: Function };

  type SendEmailData<T> = {
    from: string;
    to: string;
    data: T;
  };

  type VerifyEmailTemplateData = {
    verificationCode: string;
  };

  type SignedVerifyEmailTemplateData = VerifyEmailTemplateData & {
    signedMessage: string;
  };

  interface EmailService {
    sendEmailVerificationEmail: (
      data: emailService.SendEmailData<emailService.VerifyEmailTemplateData>
    ) => Promise<void>;
    sendSignedEmailVerificationEmail: (
      data: emailService.SendEmailData<emailService.SignedVerifyEmailTemplateData>
    ) => Promise<void>;
  }
}
