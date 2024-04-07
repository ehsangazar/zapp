import IProduct from "prisma/types/IProduct";

const asyncForEach = async (
  array: IProduct[],
  callback: (product: IProduct) => Promise<void>
) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
};

export default asyncForEach;
