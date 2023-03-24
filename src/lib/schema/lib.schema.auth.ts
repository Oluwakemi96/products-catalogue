import Joi from 'joi';

export const signUp: object = Joi.object({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required().min(8)
})
