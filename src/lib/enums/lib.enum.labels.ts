import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const GENERATE_VERIFICATION_TOKEN_MIDDLEWARE= 'AuthMiddleware::generateVerificationToken'
export const SET_TOKEN_EXPIRY_MIDDLEWARE= 'AuthMiddleware::setTokenExpiry'
export const SIGN_UP_USER_CONTROLLER= 'AuthController::signUpUser'
export const VERIFY_EMAIL_CONTROLLER= 'AuthController::verifyEmail'
export const REGENERATE_TOKEN_CONTROLLER= 'AuthController::regerateVerificationToken'
export const FORGOT_PASSWORD_CONTROLLER= 'AuthController::forgotPassword'
export const RESET_PASSWORD_CONTROLLER= 'AuthController::resetPassword'
export const LOGIN_CONTROLLER= 'AuthController::Login'
export const CHECK_IF_EMAIL_ALREADY_EXISTS_MIDDLEWARE= 'AuthMiddleware::checkIfEmailAlreadyExits'
export const CHECK_IF_EMAIL_EXISTS_MIDDLEWARE= 'AuthMiddleware::checkIfEmailExists'
export const CHECK_IF_TOKEN_IS_VALID_MIDDLEWARE= 'AuthMiddleware::checkIfTokenIsValid'
export const CHECK_IF_PASSWORD_IS_VALID_MIDDLEWARE= 'AuthMiddleware::checkIfPaaswordIsValid'