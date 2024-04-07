import IProduct from "../../prisma/types/IProduct";

const useFetchHandler = () => {
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
      const newUrl = `${window.ENV.SERVER_URL}/api${url}`;
      const response = await fetch(newUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return fetchHandler;
};

export default useFetchHandler;
