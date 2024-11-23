"use client";
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const Page = () => {
  const data = [ 
    {
      title: "Helping Your Business Build Success",
      description: "Crudbits is a trailblazing healthcare digital technology transformation company, specializing in key areas of HL7 Fast Healthcare Interoperability Resources (FHIR) standards. Our expertise spans FHIR API development, data integration, and clinical decision support. We are committed to the modernization of healthcare applications, offering services such as legacy system migration, comprehensive interoperability solutions, and seamless alignment with industry standards. Clients can rely on Crudbits for a full spectrum of healthcare-related IT services, backed by our proven track record of successful projects and unwavering commitment to client satisfaction. What sets us apart is our innovative approach, ensuring that we deliver cutting-edge solutions to propel your healthcare technology into the future."
    },
    {
      title: "Specialization in HL7 FHIR",
      description: "Crudbits stands out as a specialized leader in the healthcare IT landscape, focusing exclusively on the implementation and advancement of HL7 FHIR—the gold standard for exchanging healthcare information. Our unwavering commitment to HL7 FHIR underscores our dedication to fostering interoperability and seamless data exchange within the healthcare industry. By concentrating our expertise on this cutting-edge standard, we empower healthcare organizations to achieve greater connectivity, efficiency, and innovation in their digital ecosystems. At Crudbits, we recognize that the future of healthcare relies on the fluid exchange of information, and our specialization in HL7 FHIR reflects our proactive role in driving this transformative change."
    }, 
    { 
      title: "Healthcare Industry Experience",
      description: "At Crudbits, our strength lies in our deep-rooted healthcare industry subject matter expertise. We understand the intricate nuances, unique challenges, and stringent requirements that define the healthcare sector. This specialized knowledge positions us as a trusted partner for healthcare organizations seeking digital transformation. By combining our proficiency in HL7 FHIR standards with a comprehensive understanding of the healthcare landscape, we deliver tailored solutions that address the industry’s specific needs. Crudbits is not just a technology partner; we are a dedicated ally committed to navigating the complexities of the healthcare industry, ensuring that our clients achieve sustainable success in their digital initiatives."
    },
    {
      title: "Technological Expertise",
      description: "At Crudbits, we bring a robust technological foundation to the forefront, utilizing a diverse and modern technology stack to tackle complex issues related to healthcare data and visibility. Our expertise encompasses a wide range of cutting-edge technologies, including Python, Apache Spark, Snowflake, Hadoop, Databricks, Apigee, and Node.js. This versatile stack allows us to craft innovative solutions that not only align with industry standards like HL7 FHIR but also address the dynamic and evolving nature of healthcare IT. By leveraging these powerful technologies, we empower our clients to achieve enhanced data interoperability, seamless integration, and unprecedented visibility into their healthcare ecosystems. At Crudbits, we combine our healthcare industry know-how with a state-of-the-art technological toolkit, ensuring that our solutions are not just effective today but are also future-ready for the evolving landscape of healthcare technology."
    },
    {
      title: "Problem Solving and Innovation",
      description: "At the core of Crudbits’s journey is our commitment to solving intricate healthcare data and visibility challenges. From the outset, we embarked on this journey with a problem-solving ethos, recognizing the complexities inherent in the healthcare domain. Our team thrives on innovation, utilizing forward-thinking strategies and cutting-edge technologies to pioneer solutions that go beyond conventional boundaries. Crudbits’s inception was fueled by the desire to not just address healthcare issues but to innovate and redefine the possibilities within the industry. This commitment to problem-solving and innovation remains ingrained in our DNA, propelling us to continually push the boundaries and deliver transformative solutions that make a lasting impact on healthcare data management and visibility."
    },
    {
      title: "Integration of Emerging Technologies",
      description: "At Crudbits, we seamlessly integrate our wealth of healthcare industry experience with the latest advancements in technology. Our solutions are not just built on established best practices; they also harness the power of emerging technologies. By incorporating tools and frameworks such as Python, Apache Spark, and other cutting-edge technologies, we elevate our offerings to meet the evolving needs of the healthcare landscape. This dynamic integration reflects our commitment to staying ahead of the curve, ensuring that our clients benefit from solutions that are not only rooted in industry expertise but also driven by innovation. Crudbits is dedicated to the continuous exploration and incorporation of emerging technologies, positioning our clients at the forefront of healthcare IT excellence."
    },
    {
      title: "Focus on IT Services",
      description: "At Crudbits, our primary focus is on delivering a holistic digital transformation in the healthcare sector through a diverse portfolio of IT services. We offer a comprehensive range of healthcare-related IT services, covering everything from HL7 FHIR standards implementation to interoperability solutions, data integration, and beyond. Our commitment goes beyond singular solutions; we aim to address the entirety of healthcare IT needs. Whether it’s modernizing applications, ensuring data interoperability, or leveraging emerging technologies, Crudbits is dedicated to providing end-to-end IT services that empower healthcare organizations to thrive in the digital era. Partner with us for a transformative journey toward enhanced efficiency, interoperability, and innovation in your healthcare IT landscape."
    },
    {
      title: "Our Products",
      description: "FHIR Base: FHIR Server with different RDBMS. Supports API mechanism, integrates with different API Gateways, and authentication mechanisms. FHIR Go: Administration portal to manage users, APIs, and other administration activities. Tokenization mechanism, Reporting Feature, and supports integration with Smart Apps. FHIR Plus: Clinical Data Integration (CDS Hooks), HL7 v2 to FHIR and FHIR to HL7v2 conversion, FHIR Workflow for approval and review mechanism, and conversion from Relational data to FHIR."
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  return (
    <div>
      <div className="hero max-h-[700px] h-screen w-full relative overflow-hidden">
        <div className='w-full h-full bg-black opacity-50 z-10'></div>
        <video autoPlay muted loop className="w-screen h-full object-cover absolute top-0 left-0 -z-10">
          <source src="about.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="absolute inset-0 mx-auto text-white md:w-[60%] w-full max-h-[700px] h-screen">
          <div className="flex items-center justify-center flex-col space-y-4 h-full w-full">
            <h1 className="font-bold md:text-3xl text-xl text-center pt-52">
              About Us
            </h1>
            <p className="text-md text-center">
              FHIRGo is a versatile provider of healthcare interoperability solutions, specializing in the Fast Healthcare Interoperability Resources (FHIR) standard. With extensive experience across various engagement types, including consulting and integration, FHIRGo tailors its services to meet unique client needs across multiple industry domains. The company emphasizes adherence to industry standards, ensuring data accuracy and security.
            </p>
          </div>
        </div>
      </div>

      <div className='p-2 md:py-16 py-6 md:w-[80%] w-[90%] mx-auto'>
        <h2 className='h2-style font-semibold text-2xl py-3'>Crudbits</h2>
        <p className="text-gray-600 leading-6">
          Crudbits is a pioneering healthcare digital technology transformation company specializing in HL7 FHIR standards. We offer a wide range of services, including FHIR API development, data integration, and clinical decision support, aimed at modernizing healthcare applications. Our deep industry expertise positions us as a trusted partner for organizations navigating digital transformation. Utilizing a diverse technology stack—Python, Apache Spark, Snowflake, and more—we craft innovative, future-ready solutions that enhance data interoperability and visibility. Our commitment to problem-solving and innovation drives us to integrate emerging technologies, ensuring our clients thrive in the evolving healthcare landscape. Partner with Crudbits for transformative IT services.
        </p>
      </div>



      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto pt-10">
        {data.map((item, index) => (
          <div className="flex flex-col" key={index}>
            <div
              className="md:w-[40vw] md:min-h-[20vw] min-h-72 w-full bg-cover bg-center mx-auto"
              style={{ backgroundImage: `url('/about.png')`, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            ></div>
            <div className="bg-slate-100 border-2 border-slate-300 md:w-[80%] w-[90%] md:px-4 px-2 py-6 relative mx-auto bottom-[100px] flex-grow flex flex-col justify-between space-y-4">
              <span className="text-5xl font-bold text-red-500">{index < 9 ? '0' : ''}{index + 1}</span>
              <h2 className="text-xl font-bold text-slate-600">{item.title}</h2>
              <p className="text-md">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
