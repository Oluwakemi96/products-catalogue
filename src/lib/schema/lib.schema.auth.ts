import Joi from 'joi';

export const signUp: object = Joi.object({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required().min(8)
});

export const tokenParams: object = Joi.object().keys({
    token: Joi.string().required()
});

export const userEmail: object = Joi.object({
    email: Joi.string().email().required()
})

export const resetPassword: object = Joi.object().keys({
    password: Joi.string().required().min(8)
});

export const login: object = Joi.object().keys({
    email: Joi.string().email(). required(),
    password: Joi.string().required().min(8)
});
