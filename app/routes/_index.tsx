import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Button from "~/components/Button/Button";
import Layout from "~/components/Layout/Layout";
import Modal from "~/components/Modal/Modal";
import Typography from "~/components/Typography/Typography";
import TableProducts from "~/containers/TableProducts/TableProducts";
import useFetchHandler from "~/hooks/useFetchHandler";
import useFileHandler from "~/hooks/useFileHandler";
import useProductsHandler from "~/hooks/useProductsHandler";
import FormImport from "~/containers/FormImport/FormImport";
import FormProduct from "~/containers/FormProduct/FormProduct";
import IProduct from "../../prisma/types/IProduct";

export const meta: MetaFunction = () => {
  return [
    { title: "Zapp App" },
    { name: "description", content: "Welcome to Zapp Admin" },
  ];
};

export default function Index() {
  const { fetchHandler, loading: fetchLoading } = useFetchHandler();
  const { headers, readFile, loading: fileLoading } = useFileHandler();
  const {
    products,
    init,
    update,
    remove,
    clear,
    add,
    ifSkusExists,
    saveAll,
    getToSaveProducts,
  } = useProductsHandler();

  const [updateUi, setUpdateUi] = useState<number>(0);
  const [modalName, setModalName] = useState<string | null>(null);
  const [selectedSku, setSelectedSku] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const productSelected = products.filter(
    (product) => selectedSku === product.sku
  )[0];

  const isValid =
    products.length > 0 &&
    products.filter(
      (product: IProduct) => product?.errors && product.errors.length > 0
    ).length === 0;

  const openModal = (sku: string | null, name: string) => {
    setSelectedSku(sku);
    setModalName(name);
    setError(null);
  };

  const closeModal = () => {
    setModalName(null);
    setError(null);
  };

  const handleImport = async (values: { file: File | null }) => {
    if (!values.file) return;
    const newRows = await readFile(values.file);
    const errors = init(newRows);
    if (errors.length > 0) {
      setError(`SKU already exists: ${errors.join(", ")}`);
      return;
    }
    closeModal();
  };

  const handleEdit = async (values: IProduct) => {
    if (!selectedSku) return;
    if (ifSkusExists(values.sku)) {
      setError("SKU already exists");
      return;
    }
    update(selectedSku, values);
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedSku) return;
    remove(selectedSku);
    closeModal();
  };

  const handleClear = async () => {
    clear();
  };

  const handleAdd = (values: IProduct) => {
    const error = add(values);
    if (error) {
      setError(error);
      return;
    }
    closeModal();
  };

  const handleSaveAll = async () => {
    const newProducts = getToSaveProducts();
    if (newProducts.length === 0) return;
    const response = await fetchHandler({
      url: "/v1/product",
      method: "POST",
      body: newProducts,
    });
    saveAll(response);
    setUpdateUi(updateUi + 1);
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
              <Button
                onClick={handleSaveAll}
                colorScheme="secondary"
                disabled={fetchLoading || !isValid}
                loading={fetchLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        {fileLoading && <p>Loading...</p>}
        {products.length === 0 && <p>No products</p>}
        {products.length > 0 && (
          <TableProducts
            key={`TableProducts-${updateUi}`}
            headers={headers}
            products={products}
            openModal={openModal}
          />
        )}

        {modalName === "add" && (
          <Modal title="Add Product" closeModal={closeModal}>
            <FormProduct
              productSelected={null}
              onSubmit={handleAdd}
              error={error}
            />
          </Modal>
        )}

        {modalName === "edit" && (
          <Modal title={`Edit Product ${selectedSku}`} closeModal={closeModal}>
            <FormProduct
              productSelected={productSelected}
              onSubmit={handleEdit}
              error={error}
            />
          </Modal>
        )}

        {modalName === "delete" && (
          <Modal title="Delete Product" closeModal={closeModal}>
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
          <Modal title="Import Products" closeModal={closeModal}>
            <FormImport onSubmit={handleImport} error={error} />
          </Modal>
        )}
      </div>
    </Layout>
  );
}
