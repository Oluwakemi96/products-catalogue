import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const GENERATE_VERIFICATION_TOKEN_MIDDLEWARE= 'AuthMiddleware::generateVerificationToken'
export const SET_TOKEN_EXPIRY_MIDDLEWARE= 'AuthMiddleware::setTokenExpiry'
export const SIGN_UP_USER_CONTROLLER= 'AuthController::signUpUser'
export const CHECK_IF_EMAIL_ALREADY_EXISTS_MIDDLEWARE= 'AuthMiddleware::checkIfEmailAlreadyExits'