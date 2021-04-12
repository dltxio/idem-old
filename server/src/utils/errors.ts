export const badRequest = (
  message: string
): server.BadRequestGeneralResponse => ({
  statusCode: 400,
  reason: "bad_request",
  type: "general",
  message
});

export const validationBadRequest = (
  errors: server.ValidationError[]
): server.BadRequestValidationResponse => ({
  statusCode: 400,
  reason: "bad_request",
  type: "validation",
  message: "Request had validation errors",
  validationErrors: errors
});

export const notFound = (resource: string): server.NotFoundResponse => ({
  statusCode: 404,
  reason: "not_found",
  resource,
  message: "Resource could not be found."
});

export const notAuthorized = () => {
  return error(
    401,
    "unauthorized",
    "This route requires authentication. Token may be invalid."
  );
};

export const forbidden = () => {
  return error(403, "forbidden", "You do not have permission.");
};

const error = (
  statusCode: number,
  reason: server.GeneralApiErrorResponseReasonType,
  message: string
): server.ErrorResponse => {
  return {
    statusCode,
    reason,
    message
  };
};
