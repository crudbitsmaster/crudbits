"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const AdminNavbar = () => {
    const pathname = usePathname();
    const showNavbar = pathname.includes("/admin");
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {showNavbar && (
                <div className="navbar">
                    <nav className="bg-white shadow fixed top-0 w-full z-50">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-3 md:max-h-16 md:overflow-hidden">
                            <div className="content-center">
                                {/* Logo */}
                                <Link title="admin-logo" href="/" className="flex items-center justify-center h-12 w-40">
                                    <Image
                                        height={48}
                                        width={160}
                                        src="/logo.png"  // You can replace this with your own logo path
                                        className="h-12 w-40"
                                        alt="Admin Logo"
                                    />
                                </Link>
                            </div>
                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsOpen((prev) => !prev)}
                                type="button"
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 md:hidden"
                                aria-controls="navbar-default"
                                aria-expanded={isOpen}
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            </button>
                            {/* Navbar Links */}
                            <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 bg-white">
                                    {/* Dashboard Link */}
                                    <li>
                                        <Link
                                            title="Dashboard"
                                            href="/admin"
                                            className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    {/* Services Link */}
                                    <li>
                                        <Link
                                            title="Services"
                                            href="/admin/services"
                                            className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0"
                                        >
                                            Services
                                        </Link>
                                    </li>
                                    {/* Products Link */}
                                    <li>
                                        <Link
                                            title="Products"
                                            href="/admin/products"
                                            className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0"
                                        >
                                            Products
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};

export default AdminNavbar;