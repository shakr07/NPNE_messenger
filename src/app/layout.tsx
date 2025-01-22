import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import Navbar from "./components/base/Navbar";
export const metadata: Metadata = {
  title: "SHARDA CONNECTS",
  description: "Quick Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
      >
        <AppRouterCacheProvider>
          <Navbar/>
        {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
