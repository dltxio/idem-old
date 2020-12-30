import { useEffect, useState } from "react";
import dltx from "../apis/dltx";

const defaultOptions = { useSecureApi: false };

const useResource = (url, defaultData = {}, _options) => {
  const options = { ...defaultOptions, ..._options };
  const api = options.useSecureApi ? dltx.secure : dltx.open;
  
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const refresh = () => setToggle(!toggle);

  useEffect(() => {
    if (!url) return;
    (async () => {
      setIsLoading(true);
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    })();
  }, [url, toggle, api]);
  return [url ? data : defaultData, error, isLoading, refresh];
}

export default useResource;