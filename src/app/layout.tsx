import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationEvents } from "@/components/navigation-events";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog App",
  description: "A blog app built in Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
