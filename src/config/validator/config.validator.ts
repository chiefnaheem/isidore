import * as Joi from 'joi';

// define validation for all env variables
export const configValidation = Joi.object({
  CONNECTION_STRING: Joi.string().required(),
  PORT: Joi.number().default(3000),
});
