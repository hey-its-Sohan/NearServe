
"use client";

import React from 'react';
import Link from 'next/link';
import { FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";


export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
           
            <main className="flex-grow flex flex-col items-center justify-center p-6 w-full max-w-2xl">
                <motion.div
        initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
        animate={{ y: -300, x: 300, rotate: 25, opacity: 0 }}
        transition={{ duration: 3,  ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <FaRocket className="text-7xl text-lime-400 drop-shadow-[0_0_10px_#a3e635]" />
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.9, 1] }}
        transition={{ delay: 3, duration: 1.5 }}
        className="mb-8"
      >
        <FaRocket className="text-6xl text-lime-400 animate-bounce-slow" />
      </motion.div>

                <h1 className="text-8xl font-extrabold text-gray-900 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h2>

                {/* Creative and Clean Message */}
                <p className="text-gray-500 max-w-md mb-10 text-center text-lg">
                    Oops! Looks like we've stumbled upon a broken link. 
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Action Buttons with Gradient */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full justify-center">
                    <Link
                        href="/"
                        className="px-8 py-3 rounded-full text-white font-semibold shadow-lg 
                                   bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 
                                   transition-all text-base text-center"
                    >
                        Go to Homepage
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-3 rounded-full border border-green-500 text-green-600 
                                   hover:bg-green-50 hover:border-green-600 font-semibold 
                                   transition-all text-base text-center"
                    >
                        Contact Support
                    </Link>
                </div>

              
                <div className="flex flex-col items-center w-full max-w-sm">
                    <p className="text-gray-500 mb-2">Or, you try searching again:</p>
                    <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm w-full">
                        <input
                            type="text"
                            placeholder=""
                            className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700"
                        />
                        <button className="p-3 text-gray-500 hover:text-green-600 transition-colors">
                            🔍
                        </button>
                    </div>
                </div>
            </main>

          
        </div>
    );
}