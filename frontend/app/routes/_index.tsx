import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Layout from "~/components/Layout/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Zapp App" },
    { name: "description", content: "Welcome to Zapp Admin" },
  ];
};

export default function Index() {
  const [fileHeaders, setFileHeaders] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalName, setModalName] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // csv file
    event.preventDefault();
    const file = event.currentTarget[0].files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = e.target.result.split("\n");
      const headers = rows[0].split(",");
      setFileHeaders(headers);
      const newFileData = rows.map((row) => row.split(","));
      setFileData(newFileData);
    };
    reader.readAsText(file);
  };

  const openEditModal = (index: number) => {
    setSelectedIndex(index);
    setModalName("edit");
  };

  const openDeleteModal = (index: number) => {
    setSelectedIndex(index);
    setModalName("delete");
  };

  const openImportModal = () => {
    setModalName("import");
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newData = fileData.map((row, index) => {
      if (index === selectedIndex) {
        return Array.from(formData.values());
      }
      return row;
    });
    setFileData(newData);
    setModalName(null);
  };

  const handleDelete = async () => {
    const newData = fileData.filter((row, index) => index !== selectedIndex);
    setFileData(newData);
    setModalName(null);
  };

  const handleExport = async () => {
    const csvContent = fileData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
  };

  const handleClear = async () => {
    setFileData([]);
  };

  const handleSaveAll = async () => {
    // fetchHandler
    const response = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileData),
    });
    const data = await response.json();
    if (data.error) {
      setErrorMessages(data.error);
    }
  };

  return (
    <Layout>
      <h1>Welcome to Zapp Admin</h1>
      <div>
        <div>
          <div>
            <button onClick={openImportModal}>Import</button>
            <button onClick={handleExport}>Export</button>
          </div>
          <div>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleSaveAll}>Save All</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {fileHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fileData.map((row, index) => {
              if (index === 0) return null;
              return (
                <tr key={index}>
                  {row.map((column) => (
                    <td key={column}>{column}</td>
                  ))}
                  <td>
                    <button onClick={() => openEditModal(index)}>Edit</button>
                    <button onClick={() => openDeleteModal(index)}>
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
              {fileData
                .find((row, index) => index === selectedIndex)
                .map((column, i) => (
                  <div>
                    <label>{fileHeaders[i]}</label>
                    <input
                      name={fileHeaders[i]}
                      className="border border-gray-300"
                      type="text"
                      value={column}
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
