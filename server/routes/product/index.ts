import { FastifyInstance } from "fastify";
import { create } from "./controller";

async function routes(fastify: FastifyInstance) {
  fastify.post("/", create);
}

export default routes;
