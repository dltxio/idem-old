import Joi from "joi";

export type ValidationSchema<T> = { [P in keyof T]: Joi.Schema };

export type ValidationError = {
  property: string;
  message: string;
};

export const validate = async <T>(
  data: T,
  schema: ValidationSchema<T>
): Promise<
  | {
      isInvalid: true;
      errors: ValidationError[];
    }
  | { isInvalid: false }
> => {
  const validationSchema = Joi.object().keys(schema);

  const result = validationSchema.validate(data, { abortEarly: false });

  if (result.error) {
    return {
      isInvalid: true,
      errors: result.error.details.map(e => ({
        property: e.context?.key as string,
        message: e.message
      }))
    };
  }

  return {
    isInvalid: false
  };
};
