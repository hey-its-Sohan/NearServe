// src/app/(nav)/layout.jsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from './../../shared/Navbar';
import Footer from './../../shared/Footer';



const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function NavLayout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <Navbar />
      <ToastContainer />
      {children}
      <Footer />
    </div>
  );
}
