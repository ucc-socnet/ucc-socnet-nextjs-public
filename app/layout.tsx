import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UCC SocNet",
  description: "A social media app for UCC students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>

    </html>
  );
}
