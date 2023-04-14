import Joi from 'joi';

export const addProduct: object = Joi.object({
    category: Joi.string().required(),
    sizes: Joi.string().required(),
    product_image: Joi.string().required(),
    status: Joi.string().required().valid('available', 'sold out'),
    quantity: Joi.number().required(),
    description: Joi.string().required()
});

export const productId: object = Joi.object({
    product_id: Joi.string().required()
})

export const fetchAllProducts: object = Joi.object({
    category: Joi.string(),
    status: Joi.string(),
    page: Joi.number(),
    per_page:Joi.number()
})

export const orderProduct: object = Joi.object({
    product_id: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().required()
})
