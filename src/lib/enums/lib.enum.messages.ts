import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const SIGNED_UP_USER_SUCCESSFULLY = 'User signed up successfully'
export const EMAIL_VERIFIED_SUCCESSFULLY = 'Email verified successfully'
export const TOKEN_REGENERATED_SUCCESSFULLY = 'Token regenerated successfully'
export const TOKEN_SENT_TO_USER_SUCCESSFULLY = 'Token sent successfully'
export const PASSWORD_RESET_SUCCESSFULLY = 'Password reset successfully'
export const USER_LOGIN_SUCCESSFULLY = 'User logs in successfully'
export const USER_ALREADY_EXIST = 'Email already exists, kindly signup with a different email'
export const USER_DOES_NOT_EXIST = 'Email does not exist, kindly enter a valid email'
export const INVALID_TOKEN = 'Token is invalid';
export const TOKEN_EXPIRED = 'Token has expired';
export const INVALID_PASSWORD = 'Invalid login details';
export const NO_TOKEN = 'Please provide token';
export const SESSION_EXPIRED = 'Session expired';
export const USER_ACCOUNT_STATUS = (status: string) => `User account is ${status} `;
export const PRODUCT_ADDED_SUCCESSFULLY = 'Product added successfully';
export const PRODUCT_UPDATED_SUCCESSFULLY = 'Product updated successfully';
export const ACCESS_DENIED = 'Access denied! Contact support';
export const PRODUCTS_FETCHED_SUCCESSFULLY = 'Products fetched successfully';
export const PRODUCT_FETCHED_SUCCESSFULLY = 'Product fetched successfully';
export const PRODUCT_IS_SOLD_OUT = 'Product is currently sold out, kindly check for other products';
export const PRODUCT_ORDERED_SUCCESSFULLY = 'Product ordered successfuly';
export const PRODUCT_DOES_NOT_EXIST = 'Product does not exist';
export const ORDERS_FETCHED_SUCCESSFULLY = 'Orders fetched successfully';
export const ORDER_STATUS_FETCHED_SUCCESSFULLY = (status: string) => `your order is currently ${status}`;
export const ORDER_CANCELLED_SUCCESSFULLY = (order_id: string) =>  `your order ${order_id} has been cancelled successfully`;
export const ORDER_DELETED_SUCCESSFULLY = (order_id: string) =>  `your order ${order_id} has been deleted successfully`;
export const ORDER_SHIPPED_SUCCESSFULLY = (order_id: any) =>  `order ${order_id} has been shipped successfully`;
export const FEW_QUANTITY_LEFT = (quantity: number) =>  `there is only ${quantity} piece(s) left`;
export const ORDER_HAS_BEEN_CANCELLED = (order_id: string) =>  `order ${order_id} has been cancelled`;

