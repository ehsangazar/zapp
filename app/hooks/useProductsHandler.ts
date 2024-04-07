import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import IProduct, { productSchema } from "prisma/types/IProduct";
import { useState } from "react";

interface ResponseType {
  message: string;
  data: Record<string, string>;
}

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
          isSaved: false,
        };
        productSchema.validate(product, { abortEarly: false }).catch((err) => {
          product.errors = err.errors;
        });
        return product;
      });
    setProducts([...products, ...newProducts]);
    return errors;
  };

  const ifSkusExists = (sku: string): boolean => {
    const exist: IProduct | undefined = products.find(
      (product) => product.sku.trim() === sku.trim()
    );
    if (!exist) return false;
    return exist.sku !== sku;
  };

  const update = (sku: string, data: IProduct): void => {
    const newProducts = products.map((product: IProduct) => {
      if (product.sku === sku) {
        data.isSaved = false;
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

  const saveAll = (response: ResponseType): void => {
    const { data } = response;
    products.forEach((product) => {
      if (data[product.sku] === "created" || data[product.sku] === "updated") {
        product.isSaved = true;
      } else if (data[product.sku] === "error") {
        product.isSaved = false;
        product.errors = [data[product.sku]];
      }
    });
  };

  const getToSaveProducts = (): IProduct[] => {
    const newProducts: IProduct[] = [];
    products.forEach((product) => {
      if (!product.isSaved) {
        newProducts.push({
          sku: product.sku,
          description: product.description,
          quantity: product.quantity,
          store: product.store,
        });
      }
    });
    return newProducts;
  };

  const add = (data: IProduct) => {
    let error = null;
    if (products.find((product) => product.sku.trim() === data.sku.trim())) {
      error = "SKU already exists";
      return;
    }
    data.isSaved = false;
    setProducts([...products, data]);
    return error;
  };

  return {
    products,
    init,
    update,
    remove,
    clear,
    add,
    ifSkusExists,
    saveAll,
    getToSaveProducts,
  };
};

export default useProductsHandler;
