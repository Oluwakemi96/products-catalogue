import * as types from '../types/index';

export default{
    signUpUser:(body:types.users, token:string, token_expiry:Date, hashedPassword:string) => [
        body.email,
        body.first_name,
        body.last_name,
        hashedPassword,
        token,
        token_expiry
    ],
    addProducts:(body:types.product) => [
        body.category.trim().toLowerCase(),
        body.sizes,
        body.product_image,
        body.status,
        body.quantity,
        body.description

    ],
    fetchAllProducts: (query) => [
        query.category,
        query.status,
        query.page ? (query.page - 1) * (query.per_page || 10) : 0,
        query.per_page ? query.per_page : '5'
    ]
}