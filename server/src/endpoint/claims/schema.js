const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required()
}).unknown(true);

module.exports = schema;