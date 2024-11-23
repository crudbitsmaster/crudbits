"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname()
    const showNavbar = pathname.includes("/admin");
    const [products, setProducts] = useState([]);
    const [fhirProducts, setFhirProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenIn, setDropdownOpenIn] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState(null);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const toggleDropdownIn = () => {
        setDropdownOpenIn(prev => !prev);
    };

    const closeMenus = () => {
        setIsOpen(false);
        setIsHovered(false);
        setDropdownOpen(false);
        setDropdownOpenIn(false);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                data = data.filter(e => e.fhir === false);
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message || 'An unknown error occurred');
            }
        };

        const fetchFhirProducts = async () => {
            try {
                const response = await fetch('/api/products', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                data = data.filter(e => e.fhir === true);
                setFhirProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message || 'An unknown error occurred');
            }
        };

        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data);
            } catch (err) {
                console.error('Error fetching services:', err);
                setError(err.message || 'An unknown error occurred');
            }
        };

        fetchProducts();
        fetchFhirProducts();
        fetchServices();

        const handleClickOutside = (e) => {
            if (!e.target.closest('.navbar')) {
                closeMenus();
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeMenus();
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {!showNavbar && (
                <div className="navbar">
                    <nav className="bg-white shadow fixed top-0 w-full z-50">
                        <div className="max-w-screen-xl flex flex-wrap items-center md:justify-around justify-between mx-auto p-3 md:max-h-16 md:overflow-hidden">
                            <div className="content-center">
                                <Link title="crudbits" href="/" className="flex items-center justify-center h-12 w-40">
                                    <Image
                                        height={48}
                                        width={160}
                                        src="/logo.png"
                                        className="h-12 w-40"
                                        alt="Crudbits Logo"
                                    />
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsOpen(prev => !prev)}
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
                            <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 bg-white">
                                    <li>
                                        <Link title="crudbits" href="/" className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link title="crudbits" href="/about" className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link title="crudbits" href="/services"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setTimeout(() => setIsHovered(false), 2000)}
                                            onClick={() => setTimeout(() => setIsHovered(false), 50)}
                                            className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0">
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link title="crudbits" href="/products"
                                            onMouseEnter={() => setDropdownOpen(true)}
                                            onMouseLeave={() => setTimeout(() => setDropdownOpen(false), 2000)}
                                            onClick={() => setTimeout(() => setDropdownOpen(false), 50)}
                                            className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0">
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link title="crudbits" href="/industry" className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0">
                                            Industry
                                        </Link>
                                    </li>
                                    <li>
                                        <Link title="crudbits" href="/contact" className="block py-2 px-3 text-slate-900 rounded font-semibold hover:bg-slate-100 md:hover:bg-transparent md:p-0">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* Dropdowns for Products and Services */}
                    {dropdownOpen && (
                        <div className="fixed md:right-[25%] right-4 top-16 z-10 mt-2 w-48 bg-white border rounded-md shadow-lg">
                            <ul className="flex flex-col">
                                {products.map((e) => (
                                    <li key={e._id}>
                                        <Link title="crudbits" href={`/product/${e.slug}`} className="block px-4 py-2 text-slate-900 hover:bg-slate-100"
                                            onClick={() => setTimeout(() => setDropdownOpen(false), 50)}>
                                            {e.title}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => { toggleDropdownIn(); setTimeout(() => setDropdownOpen(false), 50) }}
                                        className="flex items-center justify-between px-4 py-2 text-slate-900 hover:bg-slate-100 w-full"
                                    >
                                        Fhir Suit <IoIosArrowDown />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

                    {dropdownOpenIn && (
                        <div className="fixed md:right-[25%] right-4 top-16 z-10 mt-2 w-48 bg-white border rounded-md shadow-lg">
                            <ul className="flex flex-col">
                                {fhirProducts.map((e) => (
                                    <li key={e._id}>
                                        <Link title="crudbits" href={`/product/${e.slug}`} className="block px-4 py-2 text-slate-900 hover:bg-slate-100"
                                            onClick={() => setTimeout(() => setDropdownOpenIn(false), 50)}>
                                            {e.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {(isHovered && window.innerWidth >= 775) && (
                        <div className="fixed md:right-[25%] right-4 top-16 z-10 mt-2 w-64 bg-white border rounded-md shadow-lg">
                            <ul className="flex flex-col">
                                {services.map((e) => (
                                    <li key={e._id}>
                                        <Link title="crudbits" href={`/service/${e.slug}`} className="block px-4 py-2 text-slate-900 hover:bg-slate-100"
                                            onClick={() => setTimeout(() => setIsHovered(false), 50)}>
                                            {e.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar;