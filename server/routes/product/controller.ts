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
        sku: product.oldSku,
      },
    });

    try {
      if (existingProduct) {
        await prisma.product.update({
          where: {
            sku: product.oldSku,
          },
          data: {
            sku: product.sku,
            description: product.description,
            store: product.store,
            quantity: product.quantity,
          },
        });
        messages[product.sku] = "updated";
        return;
      }

      await prisma.product.create({
        data: {
          sku: product.sku,
          description: product.description,
          store: product.store,
          quantity: product.quantity,
        },
      });
      messages[product.sku] = "created";
    } catch (error) {
      console.error(error);
      messages[product.sku] = "Something went wrong. Please try again later.";
    }
  });

  reply.send({
    message: "DONE!",
    data: messages,
  });
}

async function list(request: FastifyRequest, reply: FastifyReply) {
  const products = await prisma.product.findMany();

  reply.send(products);
}

export { create, list };
