import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lists - URL Shortener",
  description: "Lists - URL Shortener",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
