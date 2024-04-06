import { FastifyReply, FastifyRequest } from "fastify";

async function create(request: FastifyRequest, reply: FastifyReply) {
  reply.send({ success: true });
}

export { create };
