import * as yup from "yup";
import { Product } from "@prisma/client";

interface IProduct extends Omit<Product, "createdAt" | "updatedAt"> {
  isSaved?: boolean;
  oldSku?: string;
  errors?: string[];
}

export const productSchema = yup.object().shape({
  sku: yup
    .string()
    .matches(/^[A-Z]{2}-\d+$/, "Invalid SKU")
    .required("SKU is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer"),
  description: yup.string().required("Description is required"),
  store: yup.string().required("Store is required"),
  oldSku: yup.string().matches(/^[A-Z]{2}-\d+$/, "Invalid SKU"),
});

export default IProduct;
