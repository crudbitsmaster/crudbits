"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const Page = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()
    const isAdminLoggedIn = Cookies.get('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      router.push("/admin/login")
    } 
    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const response = await fetch('/admin/api/messages', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMessages(data);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError(err.message || 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const renderLoading = () => (
        <div className='absolute bg-white top-0 left-0 flex items-center justify-center h-full w-full overflow-hidden'>
            <div className='loader'></div>
        </div>
    );

    const renderError = () => (
        <div className="text-center mt-10">Error: {error}</div>
    );

    const renderNoMessages = () => (
        <div className="text-center mt-10">
            <h2 className="text-3xl">No messages left</h2>
        </div>
    );

    const renderMessages = () => (
        <div className="grid content-center min-h-screen md:grid-cols-2 grid-cols-1 gap-5 w-[80%] mx-auto my-10">
            {messages.map((message, index) => (
                <div key={index} className="my-2 item bg-slate-200 rounded-lg shadow-md transition-transform transform space-y-2 p-8">
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <b>Name:</b> <span>{message.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <b>Email:</b> <span>{message.email}</span>
                        </div>
                        <div className="flex justify-between flex-col pt-5">
                            <b className="text-xl text-center">Message</b>
                            <span>{message.message}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (loading) return renderLoading();
    if (error) return renderError();
    if (messages.length === 0) return renderNoMessages();

    return (
        <>
            <h2 className="mt-16 text-3xl tracking-tight font-extrabold text-center text-gray-900">Contact Messages</h2>
            {renderMessages()}
        </>
    );
};

export default Page;