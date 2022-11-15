import * as Joi from 'joi';

// define validation for all env variables
export const configValidation = Joi.object({
  
  CONNECTION_STRING: Joi.string().trim().required(),
  PORT: Joi.number().default(3000),
  
});
