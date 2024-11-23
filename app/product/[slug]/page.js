"use client";

import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Custom404 from "../../not-found";
import Link from 'next/link';

const Page = ({ params }) => {
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 600 });

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/products', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const filteredProduct = data.find((e) => e.slug === slug);
        setProduct(filteredProduct || null);
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className='fixed bg-white top-0 left-0 flex items-center justify-center h-full w-full overflow-hidden'>
        <div className='loader'></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <Custom404 />;
  }

  return (
    <div>
      <HeroSection product={product} />
      <ProductDetails product={product} />
      <RelatedProducts products={products} />
    </div>
  );
};

const HeroSection = ({ product }) => (
  <div
    className="hero max-h-96 h-screen w-full relative overflow-hidden bg-cover bg-no-repeat bg-center"
    style={{ backgroundImage: `url(${product.thumbnail})` }}
  >
    <div className='w-full h-full bg-black opacity-50'></div>
    <div className="absolute inset-0 mx-auto text-white flex-col space-y-4 md:w-[60%] w-[80%] h-screen pt-[100px]">
      <h1 className="mt-8 mb-4 text-4xl font-extrabold text-center">{product.title}</h1>
      <p className="text-md text-center">{product.description}</p>
    </div>
  </div>
);

const ProductDetails = ({ product }) => (
  <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto pt-10">
    {product.para.map((item, index) => (
      <div className="flex flex-col" key={item._id}>
        <div
          className="md:w-[40vw] md:min-h-[20vw] min-h-72 w-full bg-cover bg-center mx-auto"
          style={{ backgroundImage: `url(${product.thumbnail})`, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
        <div className="bg-slate-100 border-2 border-slate-300 md:w-[80%] w-[90%] md:px-4 px-2 py-6 relative mx-auto bottom-[100px] flex-grow flex flex-col justify-between space-y-4">
          <span className="text-5xl font-bold text-red-500">{index < 9 ? '0' : ''}{index + 1}</span>
          <h2 className="text-xl font-bold text-slate-600">{item.title}</h2>
          <p className="text-md">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const RelatedProducts = ({ products }) => (
  <div>
    <h2 className="my-16 text-4xl tracking-tight font-extrabold text-center text-gray-900">Products</h2>
    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto">
      {products.map((item, index) => (
        <div className="flex flex-col" key={item._id}>
          <div
            className="md:w-[40vw] md:min-h-[20vw] min-h-72 w-full bg-cover bg-center mx-auto"
            style={{ backgroundImage: `url(${item.thumbnail})`, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
          <div className="bg-slate-100 border-2 border-slate-300 md:w-[80%] w-[90%] md:px-4 px-2 py-6 relative mx-auto bottom-[100px] flex-grow flex flex-col justify-between space-y-4">
            <span className="text-5xl font-bold text-red-500">{index < 9 ? '0' : ''}{index + 1}</span>
            <h2 className="text-xl font-bold text-slate-600">{item.title}</h2>
            <p className="text-md">{item.description}</p>
            <Link
              title="Explore Product"
              href={`/product/${item.slug}`}
              className="bg-slate-500 px-8 w-fit py-2 text-white font-bold hover:bg-transparent border-2 border-slate-500 hover:text-slate-500 transition-all block my-10"
            >
              Explore
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Page;
