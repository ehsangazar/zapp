import IProduct, { productSchema } from "prisma/types/IProduct";
import { useState } from "react";

const useProductsHandler = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const init = (data: string[][]): string[] => {
    const errors: string[] = [];
    const newProducts = data
      .filter((row: string[]) => {
        const exist = products.find(
          (product) => product.sku.trim() === row[1].trim()
        );
        if (exist) errors.push(exist.sku);
        return !exist;
      })
      .map((row: string[]) => {
        const product: IProduct = {
          quantity: Number(row[0].trim()),
          sku: row[1].trim(),
          description: row[2].trim(),
          store: row[3].trim(),
        };
        productSchema.validate(product, { abortEarly: false }).catch((err) => {
          product.errors = err.errors;
        });
        console.log("debug product", product);
        return product;
      });
    setProducts([...products, ...newProducts]);
    return errors;
  };

  const ifSkusExists = (sku: string): boolean => {
    return products.find((product) => product.sku.trim() === sku.trim())
      ? true
      : false;
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

  const add = (data: IProduct) => {
    let error = null;
    if (products.find((product) => product.sku.trim() === data.sku.trim())) {
      error = "SKU already exists";
      return;
    }
    setProducts([...products, data]);
    return error;
  };

  return { products, init, update, remove, clear, add, ifSkusExists };
};

export default useProductsHandler;
