import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import product from "./routes/product";
import errorHandler from "./utils/errorHandler";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*",
});

fastify.setErrorHandler(errorHandler);

fastify.get("/", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({
    success: true,
  });
});

fastify.register(product, { prefix: "/api/v1/product" });

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
