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

