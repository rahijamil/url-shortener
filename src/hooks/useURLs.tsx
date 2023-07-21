import { URL_TYPE } from "@/types/url.types";
import { useEffect, useState } from "react";

const useUrls = () => {
  const [urls, setUrls] = useState<URL_TYPE[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUrls = localStorage.getItem("urls") || "[]";
    setUrls(JSON.parse(storedUrls));

    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    setUrls((prev) => {
      const newUrls = prev.filter((url) => url.id !== id);
      localStorage.setItem("urls", JSON.stringify(newUrls));
      return [...newUrls];
    });
  };

  return { urls, setUrls, loading, handleDelete };
};

export default useUrls;
