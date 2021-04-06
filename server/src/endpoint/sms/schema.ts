import Joi from "joi";

const put = Joi.object({
  number: Joi.string().required()
});

const post = Joi.object({
  number: Joi.string().required(),
  code: Joi.string().required()
});

export default {
  put,
  post
};
