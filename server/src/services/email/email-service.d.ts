declare namespace emailService {
  type EmailTemplate = "emailVerification";

  type EmailTemplateGenerators = { [k in EmailTemplate]: Function };

  type SendEmailData<T> = {
    from: string;
    to: string;
    data: T;
  };

  type VerifyEmailTemplateData = {
    verificationCode: string;
  };

  type EmailTemplate = "emailVerification";

  interface EmailService {
    sendEmailVerificationEmail: (
      data: emailService.SendEmailData<emailService.VerifyEmailTemplateData>
    ) => Promise<void>;
  }
}
