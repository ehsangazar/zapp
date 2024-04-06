import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import product from "./routes/product";

const fastify = Fastify({ logger: true });

fastify.get("/", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({
    success: true,
  });
});

fastify.register(product, { prefix: "/product" });

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
