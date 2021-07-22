const emailPlainTextSignedVerificationTemplate = (
  data: emailService.SignedVerifyEmailTemplateData
) => {
  return `Verification code: ${data.verificationCode} \n \n ${data.signedMessage}`;
};

export default emailPlainTextSignedVerificationTemplate