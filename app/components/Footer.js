"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa6';

const Footer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <footer className="bg-slate-50 overflow-x-hidden">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between md:mx-10">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
              <div className="content-center p-4">
                <Link title="crudbits" href="/" className="flex items-center justify-center h-fit w-full">
                  <img
                    height={50}
                    width={150}
                    src="/logo.png"
                    className="md:h-16 h-8 w-fit"
                    alt="Crudbits Logo"
                  />
                </Link>
              </div>
              <div>
                <h3 className="mb-6 text-md font-semibold text-gray-900 uppercase">Location</h3>
                <div className="textwidget">
                  <b>Crudbits</b><br />
                  30 N Gould St Ste R, Sheridan, WY 82801<br />
                  United States
                </div>
              </div>
              <div>
                <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase">Contact</h2>
                <ul className="text-gray-500 font-medium">
                  <li>
                    <FaPhone className="inline mr-5" />
                    <Link title="crudbits" href="tel:+13073818051" className="hover:underline">+1 307-381-8051</Link>
                  </li>
                  <li className="mb-2">
                    <FaEnvelope className="inline mr-5" />
                    <Link title="crudbits" href="mailto:info@Crudbits.com" className="hover:underline">info@Crudbits.com</Link>
                  </li>

                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-md font-semibold text-gray-900 uppercase">Products</h2>
                <ul className="text-gray-500 font-medium">
                  {products.map((e) => (
                    <li key={e._id} className="mb-2">
                      <Link title="crudbits" href={`/product/${e.slug}`} className="hover:underline">{e.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 md:mx-auto lg:my-8" />
          <div className="flex items-center md:justify-between justify-center md:flex-row flex-col">
            <span className="text-sm text-gray-500 text-center">
              © 2024 <Link title="crudbits" href="/" className="hover:underline">Crudbits™</Link>. All Rights Reserved.
            </span>
            <div className="flex space-x-4 md:pt-0 pt-4">
              <Link title="crudbits" href="/" className="text-gray-500 hover:text-gray-900">
                <FaFacebook />
              </Link>
              <Link title="crudbits" href="/" className="text-gray-500 hover:text-gray-900">
                <FaTwitter />
              </Link>
              <Link title="crudbits" href="/" className="text-gray-500 hover:text-gray-900">
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;