import { useState } from "react";

const useFileHandler = () => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [headers = [], setHeaders] = useState<string[]>([
    "Quantity",
    "SKU",
    "Description",
    "Store",
  ]);
  const [rows = [], setRows] = useState<string[][]>();

  const readFile = async (file: File) => {
    return new Promise<string[][]>((resolve, reject) => {
      setFile(file);
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (
          !event.target ||
          !event.target.result ||
          typeof event.target.result !== "string"
        ) {
          return;
        }
        const result = event.target.result;
        const data = result.split("\n") as string[];

        const headers = data[0].split(",");
        setHeaders(headers);

        let rows = [];
        rows = data.slice(1).map((row) => {
          return row.split(",").map((cell) => cell.trim());
        });
        setRows(rows);
        setLoading(false);
        resolve(rows);
      };
      reader.onerror = (error) => {
        setLoading(false);
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  return { file, headers, rows, readFile, loading };
};

export default useFileHandler;
