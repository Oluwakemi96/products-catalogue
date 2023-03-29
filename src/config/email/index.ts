import sgMail from '@sendgrid/mail';
import config from '../index';
import logger from '../logger';
import enums from '../../lib/enums';
import * as userType from '../../lib/types/index';
sgMail.setApiKey(config.PRODUCT_CATALOGUE_SENDGRID_API_KEY);

export const forgotPassword = async ( user:userType.users, url: string ) => {
    const msg = {
      to: `${user.email}`, 
      from: 'rashidats@enyata.com', 
      subject: 'FORGOT PASSWORD',
      html: `<strong>click on this url <a href =${url}>${url}</a> to reset your password</strong>`,
    }
   return sgMail
      .send(msg)
      .then(() => {
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully sent a mail to reset user's password.forgotPassword.email`);
      })
      .catch((error) => {
        logger('error', `${enums.CURRENT_TIME_STAMP}, sending email to reset password failed.forgotPassword.email error===>> ${error.message}`);
      })
};