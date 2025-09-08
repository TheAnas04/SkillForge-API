export class AppError extends Error {
  constructor({ message, status = 500, code = "INTERNAL_SERVER_ERROR", details, cause, logLevel } = {}) {
    super(message || "Internal server error");
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
    this.isOperational = true;
    this.logLevel = logLevel || (status >= 500 ? "error" : "warn");
    if (cause) this.cause = cause;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const NotFoundError = (resource) => {
  throw new AppError({
    message: `${resource} not found`,
    status: 404,
    code: `${resource?.toUpperCase() || "RESOURCE"}_NOT_FOUND`
  });
};

export const ValidationError = (message = "validation failed", details) => {
  throw new AppError({
    message,
    status: 400,
    code: "VALIDATION_FAILED",
    details
  });
};

export const UnauthorizedError = (message = "Unauthorized") => {
  throw new AppError({
    message,
    status: 401,
    code: "UNAUTHORIZED",
  });
};