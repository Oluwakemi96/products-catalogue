import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const SIGNED_UP_USER_SUCCESSFULLY = 'User signed up successfully'
export const USER_ALREADY_EXIST = 'Email already exists, kindly signup with a different email'