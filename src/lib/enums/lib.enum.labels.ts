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
export const ADD_PRODUCT_CONTROLLER= 'AuthMiddleware::addProduct'
export const UPDATE_PRODUCT_CONTROLLER= 'AuthMiddleware::updateProduct'
export const CHECK_IF_USER_IS_ADMIN_MIDDLEWARE= 'AuthMiddleware::checkIfUserIsAdmin'
export const FETCH_ALL_PRODUCTS_CONTROLLER= 'AuthController::fetchAllProducts'
export const FETCH_A_PRODUCT_CONTROLLER= 'AuthMiddleware::fetchAProducts'
export const CHECK_IF_PRODUCT_IS_AVAILABLE_MIDDLEWARE= 'AuthMiddleware::checkIfProductIsAvailable'
export const CHECK_IF_PRODUCT_EXISTS_MIDDLEWARE= 'AuthMiddleware::checkIfProductExists'
export const ORDER_A_PRODUCT_CONTROLLER = 'AuthController::orderAProduct'
export const FETCH_USER_ORDERS_CONTROLLER = 'AuthController::fetchUserOrder'
export const TRACK_ORDER_CONTROLLER = 'AuthController::trackOrder'
export const CANCEL_ORDER_CONTROLLER = 'AuthController::cancelOrder'
export const DELETE_ORDER_CONTROLLER = 'AuthController::deleteOrder'