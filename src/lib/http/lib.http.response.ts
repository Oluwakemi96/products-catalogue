import status from 'http-status';

export default {
  success: (res:any, message:any, code:any, data:any):void => res.status(code).json({
    status: 'success',
    message,
    code,
    data: data || [],
  }),

  error: (res:any, message = '', code = 500):void => {
    const msg = code === 500 ? 'Internal Server Error' : message;
    return res.status(code).json({
      status: 'error',
      error: status[`${code}_NAME`],
      message: msg,
      code,
    });
  },
};
