"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-primary w-full h-[90px] sm:h-20 flex justify-between items-center px-6 md:px-6 lg:px-[30px] font-bold text-white text-xl">
      <div className="shrink-0">
        <Image src={require("../../assets/logo.png")} alt="logo" width={100} height={100} className="hidden sm:block" />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2">
          <svg className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
            {isOpen ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h10a1 1 0 100-2H4zm-1 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>
      <div className={`flex-col md:flex-row md:flex items-center justify-between absolute md:static bg-primary w-full md:w-auto transition-all duration-300 ease-in-out ${isOpen ? "top-[90px] left-0 z-50" : "top-[-490px] left-0"}`}>
      
        <Link href="/" className="py-2 px-5 block">Home</Link>
        <Link href="/about" className="py-2 px-5 block">About Us</Link>
        <Link href="/dictionary" className="py-2 px-5 block">Dictionary</Link>
        
        <div className="py-2 px-5">
          <Link href="/demo">Try now</Link>
        </div>
      </div>
    </header>
  );
};
