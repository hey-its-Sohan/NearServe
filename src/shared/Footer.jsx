"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "../../public/logo.png";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="w-full border-t border-border bg-card text-foreground">
            <div className="fix-alignment py-10 grid gap-8 md:grid-cols-3 lg:grid-cols-4">
                {/* === Brand Section === */}
                <div className="space-y-3 ">
                    <div className="flex">
                        <Image src={logo} alt="Logo" className="h-10 w-8" />
                        <h2 className="text-gradient text-2xl md:text-3xl font-bold">NearServe</h2>
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        Where local skills meet local needs.
                    </p>
                </div>

                {/* === Quick Links === */}
                <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/about" className="hover:text-primary transition-colors">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-primary transition-colors">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/support" className="hover:text-primary transition-colors">
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* === Legal Links === */}
                <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/terms" className="hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* === Social Media === */}
                <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
                            <Facebook size={20} />
                        </Link>
                        <Link href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </Link>
                        <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
                            <Twitter size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* === Bottom Section === */}
            <div className="border-t border-border mt-8 py-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} NearServe. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
