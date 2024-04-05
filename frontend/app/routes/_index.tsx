import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import Layout from "~/components/Layout/Layout";
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
          <div className="grid grid-cols-2 gap-4 pb-4">
            <Button
              onClick={() => openModal(null, "import")}
              colorScheme="primary"
            >
              Import
            </Button>
            <Button onClick={handleSaveAll} colorScheme="secondary">
              Save All
            </Button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={`header-${index}`}>{header.toUpperCase()}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: IProduct, index) => {
              return (
                <tr key={`tr-${index}`}>
                  {Object.keys(product).map((key) => (
                    <td key={`td-${index}-${key}`}>
                      {product[key as keyof IProduct]}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => openModal(product.sku, "edit")}>
                      Edit
                    </button>
                    <button onClick={() => openModal(product.sku, "delete")}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
          <div>
            <h2>Delete Modal</h2>
            <button onClick={() => setModalName(null)}>Close</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
        {/* import Modal */}
        {modalName === "import" && (
          <div>
            <h2>Import Modal</h2>
            <button onClick={() => setModalName(null)}>Close</button>
            <form onSubmit={handleSubmit}>
              <input type="file" />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
