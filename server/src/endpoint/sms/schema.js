const Joi = require("joi");

const schema = Joi.object({
  number: Joi.string().required(),
});

module.exports = schema;
