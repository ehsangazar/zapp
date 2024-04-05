import IProduct from "~/types/IProduct";
import { useState } from "react";

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
    setProducts([...products, ...newProducts]);
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

  const add = (data: IProduct): void => {
    setProducts([...products, data]);
  };

  return { products, init, update, remove, clear, add };
};

export default useProductsHandler;
