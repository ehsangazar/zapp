import IProduct from "~/types/IProduct";
// import * as yup from "yup";
import { useState } from "react";

// const productSchema = yup.object().shape({
//   sku: yup.string().required("SKU is required"),
//   quantity: yup
//     .number()
//     .required("Quantity is required")
//     .positive("Quantity must be positive")
//     .integer("Quantity must be an integer"),
//   description: yup.string().required("Description is required"),
//   store: yup.string().required("Store is required"),
// });

const useProductsHandler = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const init = (data: string[][]): void => {
    const newProducts = data.map((row: string[]) => {
      return {
        quantity: Number(row[0]),
        sku: row[1],
        description: row[2],
        store: row[3],
        updated: true,
        saved: false,
      };
    });
    setProducts(newProducts);
  };

  const update = (sku: string, data: IProduct): void => {
    const newProducts = products.map((product: IProduct) => {
      if (product.sku === sku) {
        return data;
      }
      return product;
    });
    setProducts(newProducts);
  };

  const remove = (sku: string): void => {
    const newProducts = products.filter((product: IProduct) => {
      return product.sku !== sku;
    });
    setProducts(newProducts);
  };

  const clear = (): void => {
    setProducts([]);
  };

  return { products, init, update, remove, clear };
};

export default useProductsHandler;
