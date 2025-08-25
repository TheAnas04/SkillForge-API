import { config } from "../config/env.js";
import { AppError } from "../lib/appError.js";
import { logger } from "../lib/logger.js";

const isProd = config.NODE_ENV==='production';

const errorHandler = (err, req, res, _next) => {
  let appError;

  if(err instanceof AppError){
    appError = err;
  } else {
    appError = new AppError({
      message: 'Internal server error',
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      cause: err
    })
  }

  const requestId = req.requestId || req.headers['x-request-id'];

  logger.error('Request error: ', {
    requestId,
    method: req.method,
    path: req.originalUrl || req.url,
    status: appError.status,
    code: appError.code,
    message: appError.message,
    details: appError.details,
    stack: appError.isOperational ? undefined : (appError.cause?.stack || appError.stack)
  });

  const payload = {
    status: appError.status,
    code: appError.code,
    message: appError.message,
    requestId,
  }

  if(!isProd || appError.status<500){
    if(appError.details) payload.details = appError.details
  }

  res.status(appError.status).json(payload);
}

export default errorHandler;