import { FastifyInstance } from "fastify";
import { create, list } from "./controller";
import * as yup from "yup";
import { productSchema } from "../../../prisma/types/IProduct";
import {
  IValidationCompiler,
  IValidationCompilerResult,
} from "~/types/IFastify";

async function routes(fastify: FastifyInstance) {
  fastify.get("/", list);
  fastify.post(
    "/",
    {
      schema: {
        body: yup.array().of(productSchema),
      },
      validatorCompiler: ({ schema }: IValidationCompiler) => {
        return (data) => {
          try {
            schema.validateSync(data, { abortEarly: false });
            return {
              value: data,
            } as IValidationCompilerResult;
          } catch (errors) {
            return { errors } as IValidationCompilerResult;
          }
        };
      },
    },
    create
  );
}

export default routes;
