import Response from '../../lib/http/lib.http.response.js';

/**
 * Joi validation of request parameters
 * @param {function} schema - the Joi schema
 * @param {string} type - the request type
 * @returns {object} - Returns an object (error or response).
 * @memberof ModelMiddleware
 */
const validateData = (schema:any, type:string): object => async (req:any, res:any, next:any) => {
  interface schema {
    [requestType: string]: object
  }
  try {
    const getType: schema =  {
      payload: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      files: req.files,
    };
    const data = getType[type];
    const options = { language: { key: '{{key}} ' } };

    const valid = await schema.validate(data, options);
    if (valid.error) {
      const { message } = valid.error.details[0];
      return Response.error(res, message.replace(/["]/gi, ''), 422);
    }
  } catch (error) {
    return error;
  }
  return next();
};

export default validateData;
