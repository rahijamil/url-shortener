import { URL_TYPE } from "@/types/url.types";

export const redirectToLong = (id: URL_TYPE["id"]) => {
  try {
    const storageURLs = localStorage.getItem("urls");
    const urls: URL_TYPE[] = storageURLs ? JSON.parse(storageURLs) : [];

    const url = urls.find((url) => url.id === id);

    if (!url) {
      throw new Error("URL not found");
    }
    window.open(url.longURL, "_blank");
  } catch (error) {
    console.error(error);
  }
};
