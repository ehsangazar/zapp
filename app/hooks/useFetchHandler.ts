import { useState } from "react";
import IProduct from "../../prisma/types/IProduct";

const useFetchHandler = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHandler = async ({
    url,
    method,
    body,
  }: {
    url: string;
    method: string;
    body?: IProduct[];
  }) => {
    try {
      setLoading(true);
      const newUrl = `${window.ENV.SERVER_URL}/api${url}`;
      const response = await fetch(newUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return {
    loading,
    fetchHandler,
  };
};

export default useFetchHandler;
