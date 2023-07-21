import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit - URL Shortener",
  description: "Edit - URL Shortener",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
