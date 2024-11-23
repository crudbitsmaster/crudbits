"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";

const ServiceComponent = () => {
    const [serviceItems, setServiceItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 600 });

        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/services', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServiceItems(data);
            } catch (err) {
                console.error('Error fetching services:', err);
                setError(err.message || 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className='fixed top-0 bg-white left-0 flex items-center justify-center h-full w-full overflow-hidden'>
                <div className='loader'></div>
            </div>
        );
    }

    return (
        <div className='pt-16'>
            {error && <div className="error-message">{error}</div>}
            <div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto">
                    {serviceItems.map((item, index) => (
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
                                <Link
                                    title="crudbits"
                                    href={`/service/${item.slug}`}
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

export default ServiceComponent;
