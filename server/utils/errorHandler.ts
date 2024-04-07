import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  let response;

  const { errors } = error as FastifyError & { errors: unknown };

  if (errors) {
    response = {
      success: false,
      error: {
        message: "Validation Error",
        errors: errors,
      },
    };
  } else {
    response = {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
  reply.send(response);
};

export default errorHandler;
