import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";


const rajdhani = Rajdhani({
  subsets: ["latin"],  
  weight: ["400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Password Generator",
  description: "John Rave Mimay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}