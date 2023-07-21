"use client";

// Importing necessary packages and components
import { redirectToLong } from "@/services/url.service";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

// Component function for redirecting to the original (long) URL
const RedirectToLongURL = ({ params }: { params: { url_id: string } }) => {
  // Using Next.js router for navigation
  const router = useRouter();

  // useCallback ensures the router.replace function doesn't cause unnecessary re-renders
  const replaceRoot = useCallback(() => {
    router.replace("/");
  }, [router]);

  useEffect(() => {
    // Call function to redirect to the long URL version based on url_id
    redirectToLong(params.url_id);

    // After redirecting, replace the current route in the history with the root route
    replaceRoot();
  }, [params, replaceRoot]);

  // This component doesn't render anything
  return null;
};

export default RedirectToLongURL;
