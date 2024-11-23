"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";

const Products = () => {
    const [productItems, setProductItems] = useState([]);
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
                setProductItems(data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message || 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className='fixed top-0 bg-white left-0 flex items-center justify-center h-full w-full overflow-hidden'>
                <div className='loader'></div>
            </div>
        );
    }

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <div>
                <div className="hero max-h-[700px] h-screen w-full relative overflow-hidden">
                    <div className='w-full h-full bg-black opacity-50 z-10'></div>
                    <video autoPlay muted loop className="w-screen h-full object-cover absolute top-0 left-0 -z-10">
                        <source src="products.mp4" type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    <div className="absolute inset-0 mx-auto text-white md:w-[60%] w-full max-h-[700px] h-screen">
                        <div className="flex items-center justify-center flex-col space-y-4 h-full w-full">
                            <h1 className="font-bold md:text-3xl text-xl text-center pt-52">
                                Products
                            </h1>
                            <p className="text-md text-center">
                                Pioneering Digital Transformation for Healthcare Excellence
                            </p>
                        </div>
                    </div>
                </div>


                <div>
                    <div className='p-2 md:py-16 py-6 md:w-[80%] w-[90%] mx-auto'>
                        <h2 className='h2-style font-semibold text-2xl py-3'>Crudbits</h2>
                        <p className="text-gray-600 leading-6">
                            LLC is a cutting-edge technology services company specializing in transforming healthcare through digital innovation. We provide expert solutions in cloud platforms like AWS, Azure, Databricks, and Snowflake, while aligning with HL7 Fast Healthcare Interoperability Resources (FHIR) standards to ensure seamless data integration and interoperability. Our services include software development, legacy system migration, clinical decision support, and end-to-end data solutions designed to modernize healthcare applications. By leveraging the power of cloud computing and healthcare standards, CRUDBits LLC helps organizations improve operational efficiency, drive innovation, and ensure compliance with industry regulations. We are dedicated to building scalable, secure, and future-ready systems that enhance healthcare delivery and outcomes.
                        </p>
                        <p className="text-gray-600 leading-6">
                            LLC is a cutting-edge technology services company specializing in transforming healthcare through digital innovation. We provide expert solutions in cloud platforms like AWS, Azure, Databricks, and Snowflake, while aligning with HL7 Fast Healthcare Interoperability Resources (FHIR) standards to ensure seamless data integration and interoperability.
                        </p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto pt-10">
                    {productItems.map((item, index) => (
                        <div
                            className="flex flex-col"
                            key={item._id}
                            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                        >
                            <div
                                className="md:w-[40vw] md:min-h-[20vw] min-h-72 w-full bg-cover bg-center mx-auto"
                                style={{ backgroundImage: `url(${item.thumbnail})`, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            ></div>
                            <div className="bg-slate-100 border-2 border-slate-300 md:w-[80%] w-[90%] md:px-4 px-2 py-6 relative mx-auto bottom-[100px] flex-grow flex flex-col justify-between space-y-4">
                                <span className="text-5xl font-bold text-red-500">{index < 9 ? '0' : ''}{index + 1}</span>
                                <h2 className="text-xl font-bold text-slate-600">{item.title}</h2>
                                <p className="text-md">{item.description}</p>
                                <Link title="crudbits" href={`/product/${item.slug}`}
                                    className="bg-slate-500 px-8 w-fit py-2 text-white font-bold hover:bg-transparent border-2 border-slate-500 hover:text-slate-500 transition-all block my-10"
                                >
                                    Explore
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
