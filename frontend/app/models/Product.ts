import IProduct from "~/types/IProduct";
import * as yup from "yup";

const productSchema = yup.object().shape({
  sku: yup.string().required("SKU is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer"),
  description: yup.string().required("Description is required"),
  store: yup.string().required("Store is required"),
});

class Product {
  data: IProduct;
  saved: boolean = false;
  errorMessages: string[] = [];

  constructor(data: IProduct) {
    this.data = data;
    this.validator(data);
  }

  validator(data: IProduct): void {
    try {
      productSchema.validateSync(data);
      this.errorMessages = [];
    } catch (err) {
      this.errorMessages = err.errors;
    }
  }

  get(): IProduct {
    return this.data;
  }

  update(data: IProduct): void {
    this.data = data;
    this.saved = true;
    this.validator(data);
  }

  getSaved(): boolean {
    return this.saved;
  }

  updateStatus(): void {
    this.saved = true;
  }

  getErrorMessages(): string[] {
    return this.errorMessages;
  }

  isValid(): boolean {
    return this.errorMessages.length === 0;
  }
}

export default Product;
