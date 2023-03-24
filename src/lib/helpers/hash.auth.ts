import bcrypt from 'bcrypt';
import config from '../../config/index';

export const hashUserPassword = (password: string): string => {
    return bcrypt.hashSync(password, Number(config.PRODUCT_CATALOGUE_BCRYPT_SALT_ROUNDS));
}