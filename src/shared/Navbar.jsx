"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { useSessionData } from "@/app/context/SessionContext";
import { signOut } from "next-auth/react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
const {user} = useSessionData();

    useEffect(() => {
        const user = localStorage.getItem("nearserve_user");
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("nearserve_user");
        setIsLoggedIn(false);
    };

    return (
        <nav className="w-full border-b border-border bg-background/80 text-foreground sticky backdrop-blur top-0 z-50">
            <div className="fix-alignment flex justify-between items-center py-3 md:py-4">
                {/* === Left: Logo === */}
                <div className="flex">
                    <Image src={logo} alt="Logo" className="h-10 w-8" />
                    <Link href="/" className="text-gradient text-2xl md:text-3xl font-bold">
                        NearServe
                    </Link>
                </div>

                {/* === Middle: Nav Links (Hidden on Mobile) === */}
                <div className="hidden md:flex space-x-6 lg:space-x-10 text-base font-medium">
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                        Home
                    </Link>
                    <Link href="/allservices" className="hover:text-primary transition-colors duration-200">
                        All Services
                    </Link>
                    <Link href="/about" className="hover:text-primary transition-colors duration-200">
                        About
                    </Link>
                    <Link href="/dashboard" className="hover:text-primary transition-colors duration-200">
                        Dashboard
                    </Link>
                </div>

                {/* === Right: Buttons (Hidden on Mobile) === */}
                <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
                    {!user ? (
                        <>
                            <Link
                                href={'/auth/signin'}
                                className="primary-btn text-sm md:text-base px-4 py-2"
                            >
                                Login
                            </Link>
                            <Link
                                href={'/auth/signup'}
                                className="secondary-btn text-sm md:text-base px-4 py-2"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={signOut}
                            className="secondary-btn text-sm md:text-base px-4 py-2"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* === Mobile Menu Toggle Button === */}
                <button
                    className="md:hidden p-2 rounded-lg border border-border hover:bg-muted transition"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* === Mobile & Tablet Dropdown Menu === */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border bg-card text-center py-4 space-y-3 animate-fadeIn">
                    <Link
                        href="/"
                        className="block hover:text-primary transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/allservices"
                        className="block hover:text-primary transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        All Services
                    </Link>
                    <Link
                        href="/about"
                        className="block hover:text-primary transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/dashboard"
                        className="block hover:text-primary transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <div className="pt-3 space-x-2">
                        {!isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => alert("Login Clicked!")}
                                    className="primary-btn text-sm px-4 py-2"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => alert("Register Clicked!")}
                                    className="secondary-btn text-sm px-4 py-2"
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="secondary-btn text-sm px-4 py-2"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
