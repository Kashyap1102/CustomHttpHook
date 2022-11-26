import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  setIsLoading(true);
  setError(null);
  const sendRequest = async () => {
    try {
      const response = await fetch(requestConfig.Url, {
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        method: requestConfig.method,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
