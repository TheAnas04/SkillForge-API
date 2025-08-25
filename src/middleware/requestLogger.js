import { v4 as uuidv4 } from 'uuid'
import expressWinston from 'express-winston'
import { logger } from '../lib/logger.js';

export const requestIdMiddleware = (req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
}

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: (req, res)=> `HTTP ${req.method} ${req.url} ${res.statusCode} - ${res.responseTime}ms (requestId = ${req.requestId})`,
  expressFormat: false,
  colorize: false,
  dynamicMeta: (req) => {
    return {
      requestId: req.requestId,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };
  }
})