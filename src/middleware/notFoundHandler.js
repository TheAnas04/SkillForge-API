import { AppError } from "../lib/appError.js";

const notFoundHandler = (req, res, _next) => {
  _next(
    new AppError({
      message: `Route ${req.method} ${req.originalUrl || req.url} not found`,
      status: 404,
      code: 'NOT_FOUND',
    })
  );
}

export default notFoundHandler;