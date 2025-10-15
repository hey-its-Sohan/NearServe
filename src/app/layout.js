import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/Navbar";
import Footer from "@/shared/Footer";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { SessionProviderCustom } from "./context/SessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NearServe",
  description: "Where local skills meet local needs.",
  icons: {
    icon: "logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <SessionProviderCustom>
            <Navbar />
            <ToastContainer />
            {children}
            <Footer />
          </SessionProviderCustom>
        </SessionProvider>
      </body>
    </html>
  );
}
