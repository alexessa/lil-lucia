import { useCallback, useRef, useState, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest: any = useRef([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      headers: HeadersInit = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl: AbortController) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);

        return responseData;
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setError(error);
          setIsLoading(false);
          throw error;
        }
      }
    },
    []
  );

  const clearError = () => setError(undefined);

  useEffect(() => {
    activeHttpRequest.current.forEach((httpAbortCtrl: AbortController) =>
      httpAbortCtrl.abort()
    );
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
