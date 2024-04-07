import { FastifyReply, FastifyRequest } from "fastify";
import IProduct from "../../../prisma/types/IProduct";
import prisma from "../../utils/prisma";
import asyncForEach from "../../utils/asyncForEach";

async function create(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as IProduct[];

  const messages: string[] = [];

  await asyncForEach(data, async (product: IProduct) => {
    const existingProduct = await prisma.product.findUnique({
      where: {
        sku: product.sku,
      },
    });

    if (existingProduct) {
      messages.push(`Product with sku: ${product.sku} already exists`);
      return;
    } else {
      await prisma.product.update({
        where: {
          sku: product.sku,
        },
        data: product,
      });
    }

    await prisma.product.create({
      data: product,
    });
    messages.push(`Product with sku: ${product.sku} created successfully`);
  });

  reply.send({
    message: "Product created successfully",
    data: messages,
  });
}

export { create };
