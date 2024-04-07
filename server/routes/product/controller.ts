import { FastifyReply, FastifyRequest } from "fastify";
import IProduct from "../../../prisma/types/IProduct";
import prisma from "../../utils/prisma";
import asyncForEach from "../../utils/asyncForEach";

async function create(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as IProduct[];

  const messages: Record<string, string> = {};

  await asyncForEach(data, async (product: IProduct) => {
    const existingProduct = await prisma.product.findUnique({
      where: {
        sku: product.sku,
      },
    });

    try {
      if (existingProduct) {
        await prisma.product.update({
          where: {
            sku: product.sku,
          },
          data: product,
        });
        messages[product.sku] = "updated";
        return;
      }

      await prisma.product.create({
        data: product,
      });
      messages[product.sku] = "created";
    } catch (error) {
      messages[product.sku] = "Something went wrong. Please try again later.";
    }
  });

  reply.send({
    message: "DONE!",
    data: messages,
  });
}

export { create };
