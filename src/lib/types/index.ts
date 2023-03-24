import {  Request, Response } from 'express';

export interface RequestWithToken extends Request{
    token_expiry: Date;
    token: string
};
