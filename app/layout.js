import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavBar";
import Footer from "./components/Footer";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// Metadata for the page
export const metadata = {
  title: "Crudbits - Healthcare",
  description: "Revolutionize healthcare data management with CRUDBits. Discover innovative solutions designed to deliver comprehensive results for your organization.",
  keywords: "healthcare, HL7, FHIR, interoperability, resources",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <AdminNavbar />
        <div className="py-16 min-h-screen overflow-x-hidden">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
