import type { MetaFunction } from "@remix-run/node";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import InputFile from "~/components/InputFile/InputFile";
import Layout from "~/components/Layout/Layout";
import Modal from "~/components/Modal/Modal";
import Typography from "~/components/Typography/Typography";
import TableProducts from "~/containers/TableProducts/TableProducts";
import useFetchHandler from "~/hooks/useFetchHandler";
import useFileHandler from "~/hooks/useFileHandler";
import useProductsHandler from "~/hooks/useProductsHandler";
import IProduct from "~/types/IProduct";

export const meta: MetaFunction = () => {
  return [
    { title: "Zapp App" },
    { name: "description", content: "Welcome to Zapp Admin" },
  ];
};

export default function Index() {
  const fetchHandler = useFetchHandler();
  const { headers, rows, readFile, loading } = useFileHandler();
  const { products, init, update, remove, clear } = useProductsHandler();

  const [modalName, setModalName] = useState<string | null>(null);
  const [selectedSku, setSelectedSku] = useState<string | null>(null);

  const productSelected = products.filter(
    (product) => selectedSku === product.sku
  )[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = event.currentTarget[0].files[0];
    readFile(file);
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

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!selectedSku) return;
    update(selectedSku, {
      sku: formData.get("sku") as string,
      quantity: Number(formData.get("quantity")),
      description: formData.get("description") as string,
      store: formData.get("store") as string,
    });
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
        <div>
          <div className="flex mb-4">
            <div className="mr-4">
              <Button
                onClick={() => openModal(null, "import")}
                colorScheme="primary"
              >
                Import
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

        {/* edit modal */}
        {modalName === "edit" && (
          <div>
            <h2>Edit Modal</h2>
            <button onClick={() => setModalName(null)}>Close</button>
            <form onSubmit={handleEdit}>
              {Object.keys(productSelected).map((key) => (
                <div key={`edit-form-${key}`}>
                  <label htmlFor={key}>{key}</label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    defaultValue={productSelected[key as keyof IProduct]}
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {/* delete modal */}
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
        {/* import Modal */}
        {modalName === "import" && (
          <Modal title="Import Products" closeModal={() => setModalName(null)}>
            <div>
              <Formik
                initialValues={{ file: null }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                <Form onSubmit={handleSubmit}>
                  <InputFile label="Select" name="file" />
                  <Button type="submit" colorScheme="primary">
                    Submit
                  </Button>
                </Form>
              </Formik>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
