import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import ServiceComponent from './components/ServiceComponent';
import ContactComponent from './components/ContactComponent';
 
const Home = () => {
  const testimonials = [
    {
      rating: 4.7,
      name: "John Smith",
      title: "Business Owner",
      content: "CRUDBits transformed our data management processes, enabling us to provide better patient care and improve operational efficiency. Their team is exceptional!",
      image: "/person1.jpg"
    },
    {
      rating: 4.9,
      name: "Emily Johnson",
      title: "Business Owner",
      content: "Working with CRUDBits has been a game changer! Their solutions are innovative and tailored to our needs, making our data management seamless.",
      image: "/person2.jpg"
    },
    {
      rating: 4.6,
      name: "Sarah Parker",
      title: "Business Owner",
      content: "Thanks to CRUDBits, we can now navigate complex data with ease. Their expertise has greatly improved our workflow and overall service delivery.",
      image: "/person3.jpg"
    }
  ];

  return (
    <div>
      <div className="hero max-h-[700px] h-screen w-full relative overflow-hidden">
        <div className='w-full h-full bg-black opacity-50 z-10'></div>
        <video autoPlay muted loop className="w-screen h-full object-cover absolute top-0 left-0 -z-10">
          <source src="hero.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="absolute inset-0 mx-auto text-white md:w-[60%] w-full max-h-[700px] h-screen">
          <div className="flex items-center justify-center flex-col space-y-4 h-full w-full">
            <h1 className="font-bold md:text-3xl text-xl text-center pt-52">
              Revolutionizing Data Management in Healthcare
            </h1>
            <p className="text-md text-center">
              Experience innovative solutions tailored for advanced healthcare data management to navigate complexity with ease.
            </p>
            <Link href="/contact" className="bg-white px-8 w-fit py-2 text-slate-500 font-bold hover:bg-transparent border-2 border-white hover:text-white transition-all block my-10">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className='grid md:grid-cols-2 grid-cols-1 w-[90%] mx-auto md:pt-16 pt-8'>
        <div className="content-center">
          <img
            height={50}
            width={50}
            src="/about.png"
            className="h-fit w-full md:px-10 mx-auto"
            alt="CRUDbits Logo"
          />
        </div>
        <div className='content-center mx-auto space-y-4'>
          <h2 className='text-2xl font-extrabold'>Learn how we redefine healthcare data practices through technology and excellence.</h2>
          <p>CRUDBits has helped numerous healthcare providers achieve greater visibility and efficiency in data management, transforming their practices and enhancing patient care.</p>
          <ul className='space-y-3 mt-4 ml-6 list-disc'>
            <li>Expertise in advanced data management</li>
            <li>Innovative solutions for complex challenges</li>
            <li>Commitment to customer satisfaction</li>
          </ul>
          <Link href="/about" className="bg-slate-500 px-8 w-fit py-2 text-white font-bold hover:bg-transparent border-2 border-slate-500 hover:text-slate-500 transition-all block my-10">
            About Us
          </Link>
        </div>
      </div>
      <h2 className="mt-16 text-3xl tracking-tight font-extrabold text-center text-gray-900">Our Services</h2>
      <ServiceComponent />
      <h2 className="text-3xl tracking-tight font-extrabold text-center text-gray-900">Client Feedbacks</h2>
      <div className="py-10 flex flex-wrap items-center justify-around -z-10">
        {testimonials.map((item, index) => (
          <div key={index} className="my-2 -z-10">
            <div className="item bg-slate-200 px-4 py-6 rounded-lg shadow-md transition-transform transform  md:w-[30vw] w-[320px] h-[400px] content-center space-y-2">
              <FaQuoteLeft className='text-center mx-auto text-yellow-400 text-5xl my-2' />
              <div className="profile flex items-center pl-4 ">
                <Image
                  height={50}
                  width={50}
                  src={item.image}
                  alt="Profile"
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div className="information pl-5">
                  <p className="text-brown-800 text-xl font-extrabold">{item.name}</p>
                  <p className="text-orange-600 font-bold text-sm">{item.title}</p>
                  <p className="text-yellow-400 font-bold text-lg flex items-center gap-x-3">
                    <FaStar /> {item.rating}
                  </p>
                </div>
              </div>
              <p className="text-lg leading-relaxed italic text-brown-800 text-center">
                {item.content}
              </p>
            </div>
          </div>

        ))}
      </div>

      <ContactComponent />
    </div>
  );
}

export default Home;
