"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const Page = () => {
  const router = useRouter()
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const isAdminLoggedIn = Cookies.get('isAdminLoggedIn');
  if (!isAdminLoggedIn) {
    router.push("/admin/login")
  } 
  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/services', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Delete service function
  const deleteService = async (serviceId) => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/deleteService`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'key': process.env.SECRET_KEY
        },
        body: JSON.stringify({ _id: serviceId }),
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the services state to remove the deleted service
      setServices(services.filter((service) => service._id !== serviceId));
    } catch (err) {
      console.error('Error deleting service:', err);
    } finally {
      setLoading(false);
      setConfirmDelete(false);
      setSelectedService(null);
    }
  };

  // Handle delete confirmation
  const handleDelete = (service) => {
    setSelectedService(service);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (selectedService) {
      deleteService(selectedService._id);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setSelectedService(null);
  };

  // Loader while fetching services
  if (loading) {
    return (
      <div className='absolute bg-white top-0 left-0 flex items-center justify-center h-full w-full overflow-hidden'>
        <div className='loader'></div> {/* Ensure loader CSS is defined */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Services</h1>
        <Link title='crudbits' href={"/admin/addService"} className="flex items-center justify-center gap-2 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
          <FaPlus /> Add Service
        </Link>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {services.length === 0 ? (
          <div className="text-center text-gray-500">No services available</div>
        ) : (
          services.map((service) => (
            <div key={service._id} className="bg-slate-100 p-4 pb-0 rounded-lg shadow-md h-96 overflow-x-auto relative">
              <h2 className="font-bold text-xl py-2 text-center">{service.title}</h2>
              <p className="font-md">{service.description}</p>
              <h2 className="font-bold text-3xl py-2 text-center">Paragraphs</h2>
              {service.para && service.para.map((item, index) => (
                <div key={index} className='p-2'>
                  <h2 className='font-semibold text-md'>{item.title}</h2>
                  <p className="text-gray-600 text-sm leading-6">{item.description}</p>
                </div>
              ))}
              <div className="flex justify-end sticky bottom-0 right-0 w-full bg-slate-100 p-4">
                <Link href={`/admin/updateService/${service.slug}`} title="crudbits" className="flex items-center justify-center gap-2 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mr-2">
                  <FaEdit /> Edit
                </Link>
                <button className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(service)}>
                  <MdDelete /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {confirmDelete && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold">Are you sure you want to delete {selectedService?.title}?</h2>
            <div className="flex justify-end mt-4">
              <button className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleConfirmDelete}>
                <MdDelete /> Yes, delete
              </button>
              <button className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;