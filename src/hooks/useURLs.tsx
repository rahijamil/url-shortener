import { URL_TYPE } from "@/types/url.types";
import { useEffect, useState } from "react";

const useUrls = () => {
  const [urls, setUrls] = useState<URL_TYPE[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === "urls") {
        const storedUrls = JSON.parse(event.newValue || "[]");
        setUrls(storedUrls);
        setLoading(false);
      }
    };

    const storedUrls = localStorage.getItem("urls") || "[]";
    setUrls(JSON.parse(storedUrls));
    setLoading(false);

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loading]);

  const handleDelete = (id: string) => {
    const newUrls = urls.filter((url) => url.id !== id);
    setUrls(newUrls);
    localStorage.setItem("urls", JSON.stringify(newUrls));
    setLoading(false);
  };

  return { urls, setUrls, loading, handleDelete };
};

export default useUrls;
