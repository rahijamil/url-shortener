"use client";

import { redirectToLong } from "@/services/url.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectToLongURL = ({ params }: { params: { url_id: string } }) => {
  const router = useRouter();

  useEffect(() => {
    redirectToLong(params.url_id);

    router.replace("/");
  }, [params, router]);

  return null;
};

export default RedirectToLongURL;
