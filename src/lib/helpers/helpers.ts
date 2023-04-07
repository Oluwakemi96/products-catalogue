import Crypto from 'crypto';

export const setTokenExpire = (minutes:number) => {
    const expiresIn = new Date().getTime() + minutes * 60 * 1000;
    return new Date(expiresIn);
  };

  export const generateRandomString = (size:number) => {
    try {
      return Crypto.randomBytes(size).toString('hex');
    } catch (error) {
      return error;
    }
  }; 

  export const calculatePages = (total, limit) => {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  };
  