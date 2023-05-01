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
export const signUp = async ( user:userType.users, url: string ) => {
    const msg = {
      to: `${user.email}`, 
      from: 'rashidats@enyata.com', 
      subject: 'VERIFY EMAIL',
      html: `<strong>Welcome to PORTTITUDE, Home of life!!.. click <a href =${url}>${url}</a> to verify your email and 
       fully set up your account for seamless experience. this link will expire in 10mins
      </strong>`,
    }
   return sgMail
      .send(msg)
      .then(() => {
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully sent a mail to verify user's email.signUp.email`);
      })
      .catch((error) => {
        logger('error', `${enums.CURRENT_TIME_STAMP}, sending email to verify email failed.signUp.email error===>> ${error.message}`);
      })
};
export const orderShipped = async ( user:userType.users, order_id: any ) => {
    const msg = {
      to: `${user.email}`, 
      from: 'rashidats@enyata.com', 
      subject: 'ORDER SHIPPED',
      html: `<strong> Your Order ${order_id} Has Been Shipped successfully, Our Delivery Agent Will Contact
      you soonest. Thanks for Shopping With Us
      </strong>`,
    }
   return sgMail
      .send(msg)
      .then(() => {
        logger('info', `${enums.CURRENT_TIME_STAMP}, successfully sent a mail for shipped order email.orderShipped.email`);
      })
      .catch((error) => {
        logger('error', `${enums.CURRENT_TIME_STAMP}, sending email for shipped order failed orderShipped.email error===>> ${error.message}`);
      })
};