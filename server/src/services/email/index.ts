import nodemailer from "nodemailer";
import emailVerificationTemplate, { VerifyEmailTemplateData } from './templates/email-verification-template'

type EmailTemplate = "emailVerification";

type EmailTemplateGenerators = { [k in EmailTemplate]: Function };

type SendEmailData<T> = {
  to: string,
  data: T
};

const mailer = nodemailer.createTransport({
  pool: true,
  host: 'outlook.office365.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const templateGenerators: EmailTemplateGenerators = {
  emailVerification: emailVerificationTemplate
}

const sendEmail = <T>({ to, subject, template, data }: {
  to: string,
  subject: string,
  template: EmailTemplate
  data: T
}) => {
  return mailer.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: templateGenerators[template](data)
  });
};

export default {
  sendEmailVerificationEmail: (data: SendEmailData<VerifyEmailTemplateData>) => sendEmail({
    template: 'emailVerification',
    subject: 'Email verification',
    ...data,
  })
}


