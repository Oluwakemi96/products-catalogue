import {  Request, Response } from 'express';

export interface RequestWithToken extends Request{
    token_expiry: Date,
    token: string
};

export type users = {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    is_admin: boolean,
    is_email_verified: boolean,
    is_deleted: boolean,
    token: string,
    token_expiry: string,
    password: string
}

export type product = {
    category?: string,
    sizes?: string,
    product_image?: string,
    status?: string,
    quantity?: string,
    description?: string,
    page?: number,
    per_page?: number
}

export interface RequestWithUser extends RequestWithToken{
    user: users
};
