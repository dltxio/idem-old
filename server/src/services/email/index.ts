import nodemailer, { Transporter } from "nodemailer";
import emailVerificationTemplate from "./templates/email-verification-template";
import signedEmailVerificationTemplate from "./templates/signed-email-verification-template";

const templateGenerators: emailService.EmailTemplateGenerators = {
  emailVerification: emailVerificationTemplate,
  signedEmailVerification: signedEmailVerificationTemplate
};

export default class Office365EmailService
  implements emailService.EmailService {
  private mailer: Transporter;

  constructor(config: Config["email"]["support"]) {
    this.mailer = nodemailer.createTransport({
      pool: true,
      host: "outlook.office365.com",
      port: 587,
      secure: false, // use TLS
      auth: {
        user: config.address,
        pass: config.password
      }
    });
  }

  public sendEmailVerificationEmail = async (
    data: emailService.SendEmailData<emailService.VerifyEmailTemplateData>
  ) => {
    return this.sendEmail({
      template: "emailVerification",
      subject: "Email verification",
      ...data
    });
  };

  public sendSignedEmailVerificationEmail = async (
    data: emailService.SendEmailData<emailService.SignedVerifyEmailTemplateData>
  ) => {
    return this.sendEmail({
      template: "emailVerification",
      subject: "Email verification",
      plainText: true,
      ...data
      
    });
  };

  private sendEmail = <T>({
    to,
    from,
    subject,
    template,
    data,
    plainText
  }: {
    to: string;
    from: string;
    subject: string;
    template: emailService.EmailTemplate;
    data: T;
    plainText?: boolean
  }) => {

    const content = templateGenerators[template](data);

    return this.mailer.sendMail({
      from,
      to,
      subject,
      ...(plainText ? { text: content } : { html: content })
    });
  };
}
