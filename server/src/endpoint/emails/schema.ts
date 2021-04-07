import Joi from "joi";

const sendEmailVerificationEmailBody = Joi.object({
  email: Joi.string().required()
});

export default {
  sendEmailVerificationEmailBody
};
