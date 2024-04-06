import * as yup from "yup";
interface IProduct {
  sku: string;
  quantity: number;
  description: string;
  store: string;
  isValid?: boolean;
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
});

export default IProduct;
