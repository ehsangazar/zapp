import { Form, Formik } from "formik";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import IProduct, { productSchema } from "~/types/IProduct";
import InputTextArea from "~/components/InputTextArea/InputTextArea";
import Alert from "~/components/Alert/Alert";

interface FormProductProps {
  productSelected: IProduct | null;
  onSubmit: (values: IProduct) => void;
  error: string | null;
}

const FormProduct = ({
  productSelected,
  onSubmit,
  error,
}: FormProductProps) => {
  return (
    <div>
      <Formik
        initialValues={{
          sku: productSelected?.sku || "",
          quantity: productSelected?.quantity || 0,
          description: productSelected?.description || "",
          store: productSelected?.store || "",
        }}
        validationSchema={productSchema}
        onSubmit={onSubmit}
      >
        <Form className="mt-4">
          {error && <Alert message={error} type="error" />}
          <div>
            <Input label="SKU" name="sku" type="text" />
          </div>
          <div>
            <Input label="Quantity" name="quantity" type="number" />
          </div>
          <div>
            <InputTextArea label="Description" name="description" />
          </div>
          <div>
            <Input label="Store" name="store" type="text" />
          </div>
          <Button type="submit" colorScheme="primary">
            {productSelected ? "Save" : "Add"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormProduct;
