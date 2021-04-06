import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required()
}).unknown(true);

export default schema;
