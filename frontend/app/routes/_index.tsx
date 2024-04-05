import type { MetaFunction } from "@remix-run/node";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import InputFile from "~/components/InputFile/InputFile";
import Input from "~/components/Input/Input";
import Layout from "~/components/Layout/Layout";
import Modal from "~/components/Modal/Modal";
import Typography from "~/components/Typography/Typography";
import TableProducts from "~/containers/TableProducts/TableProducts";
import useFetchHandler from "~/hooks/useFetchHandler";
import useFileHandler from "~/hooks/useFileHandler";
import useProductsHandler from "~/hooks/useProductsHandler";
import * as yup from "yup";
import FormImport from "~/containers/FormImport/FormImport";
import FormProduct from "~/containers/FormProduct/FormProduct";
import IProduct from "~/types/IProduct";

export const meta: MetaFunction = () => {
  return [
    { title: "Zapp App" },
    { name: "description", content: "Welcome to Zapp Admin" },
  ];
};

const productSchema = yup.object().shape({
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

export default function Index() {
  const fetchHandler = useFetchHandler();
  const { headers, rows, readFile, loading } = useFileHandler();
  const { products, init, update, remove, clear } = useProductsHandler();

  const [modalName, setModalName] = useState<string | null>(null);
  const [selectedSku, setSelectedSku] = useState<string | null>(null);

  const productSelected = products.filter(
    (product) => selectedSku === product.sku
  )[0];

  const handleSubmit = (values: { file: File | null }) => {
    if (!values.file) return;
    readFile(values.file);
    setModalName(null);
  };

  useEffect(() => {
    if (rows.length) {
      init(rows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const openModal = (sku: string | null, name: string) => {
    setSelectedSku(sku);
    setModalName(name);
  };

  const handleEdit = async (values: IProduct) => {
    if (!selectedSku) return;
    update(selectedSku, values);
    setModalName(null);
  };

  const handleDelete = async () => {
    if (!selectedSku) return;
    remove(selectedSku);
    setModalName(null);
  };

  const handleClear = async () => {
    clear();
  };

  const handleSaveAll = async () => {
    // // fetchHandler
    // const response = await fetchHandler({
    //   url: "/api/save",
    //   method: "POST",
    //   body: fileData,
    // });
    // if (response) {
    //   setErrorMessages(response);
    // }
  };

  return (
    <Layout>
      <div>
        <div
          className="
          grid
          grid-cols-[1fr_1fr]
          gap-1
          md:gap-4
          mb-4
          w-full
        "
        >
          <div className="flex mb-4">
            <div className="mr-1 md:mr-4">
              <Button
                onClick={() => openModal(null, "import")}
                colorScheme="primary"
              >
                Import
              </Button>
            </div>
            <div>
              <Button onClick={handleClear} colorScheme="danger">
                Clear
              </Button>
            </div>
          </div>
          <div className=" flex justify-end">
            <div className="mr-1 md:mr-4">
              <Button
                onClick={() => openModal(null, "add")}
                colorScheme="primary"
              >
                Add
              </Button>
            </div>
            <div>
              <Button onClick={handleSaveAll} colorScheme="secondary">
                Save All
              </Button>
            </div>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {products.length === 0 && <p>No products</p>}
        {products.length > 0 && (
          <TableProducts
            headers={headers}
            products={products}
            openModal={openModal}
          />
        )}

        {modalName === "edit" && (
          <Modal
            title={`Edit Product ${selectedSku}`}
            closeModal={() => setModalName(null)}
          >
            <FormProduct
              productSelected={productSelected}
              onSubmit={handleEdit}
            />
          </Modal>
        )}

        {modalName === "delete" && (
          <Modal title="Delete Product" closeModal={() => setModalName(null)}>
            <div className="py-4">
              <Typography.P>
                Are you sure you want to delete this product?
              </Typography.P>
            </div>
            <Button onClick={handleDelete} colorScheme="danger">
              Delete
            </Button>
          </Modal>
        )}

        {modalName === "import" && (
          <Modal title="Import Products" closeModal={() => setModalName(null)}>
            <FormImport onSubmit={handleSubmit} />
          </Modal>
        )}
      </div>
    </Layout>
  );
}
