class CustomError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  public errorName: string;
  public validation: any;

  constructor(
    message: string,
    statusCode: number,
    errorName: string,
    statusName: string,
    validation: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusName;
    this.isOperational = true;
    this.errorName = errorName;
    this.validation = validation;

    Error.captureStackTrace(this, this.constructor);
  }

  toPayload() {
    return {
      code: this.statusCode,
      status: this.status.toUpperCase(),
      recordsTotal: 0,
      data: null,
      error: {
        name: this.errorName,
        message: this.message,
        validation: this.validation
      }
    };
  }
}

class NotFoundError extends CustomError {
  constructor(message: string = "Resource not found.") {
    super(message, 404, "DoesNotExist", "NOT_FOUND");
  }
}

class ValidationError extends CustomError {
  constructor(validation: any) {
    super("Validation error.", 422, "ValidationError", "VALIDATION_ERROR", validation);
  }
}

class BadRequestError extends CustomError {
  constructor(message: string = "Bad request.") {
    super(message, 400, "BadRequest", "BAD_REQUEST");
  }
}

class InternalServerError extends CustomError {
  constructor(message: string = "Internal server error.") {
    super(message, 500, "InternalServerError", "INTERNAL_SERVER_ERROR");
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string = "Not authorized.") {
    super(message, 401, "NotAuthorized", "UNAUTHORIZED");
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string = "Forbidden.") {
    super(message, 403, "Forbidden", "FORBIDDEN");
  }
}

export {
  NotFoundError,
  ValidationError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  ForbiddenError
};
