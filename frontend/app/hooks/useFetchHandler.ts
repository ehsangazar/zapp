import IProduct from "~/types/IProduct";

interface FetchHandler {
  (props: { url: string; method: string; body?: IProduct[] }): Promise<void>;
}

const useFetchHandler = (): FetchHandler => {
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
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        return null;
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return fetchHandler;
};

export default useFetchHandler;
