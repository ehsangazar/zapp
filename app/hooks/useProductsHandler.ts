import IProduct, { productSchema } from "../../prisma/types/IProduct";
import { useState } from "react";

interface ResponseType {
  message: string;
  data: Record<string, string>;
}

const useProductsHandler = (defaultProducts: IProduct[] = []) => {
  const [products, setProducts] = useState<IProduct[]>(defaultProducts);

  const initFromCSV = (data: string[][]): string[] => {
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
          oldSku: row[1].trim(),
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

  const initFromAPI = (data: IProduct[]): void => {
    const newProducts = data.map((product) => {
      product.isSaved = true;
      return product;
    });
    setProducts(newProducts);
  };

  const ifSkusExists = (sku: string): boolean => {
    const exist: IProduct | undefined = products.find(
      (product) => product.sku.trim() === sku.trim()
    );
    return !!exist;
  };

  const update = (sku: string, data: IProduct): void => {
    const newProducts = products.map((product: IProduct) => {
      if (product.sku === sku) {
        data.isSaved = false;
        data.oldSku = product.sku;
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
          oldSku: product.oldSku,
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
    const exist = products.find(
      (product) => product.sku.trim() === data.sku.trim()
    );
    if (exist) {
      error = "SKU already exists";
      return error;
    }
    data.isSaved = false;
    data.oldSku = data.sku;
    setProducts([...products, data]);
    return error;
  };

  return {
    products,
    initFromCSV,
    initFromAPI,
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
