import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";


export const metadata: Metadata = {
  title: "Digital ID Card",
  description: "Create and share your digital identity card",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">

      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  );
}
