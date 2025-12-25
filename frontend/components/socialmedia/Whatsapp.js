"use client";
import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

function Whatsapp() {
  return (
    <Link
      href="https://whatsapp.com/channel/0029VbCMA5J8fewyQjenT01I"
      target="_blank"
      rel="noopener noreferrer"
      className="group  fixed left-0   bottom-24  z-50 flex items-center bg-green-500 hover:bg-green-600 text-white rounded-r-full shadow-lg overflow-hidden transition-all duration-300 w-14 hover:w-40"
    >
      {/* Icon */}
      <div className="flex items-center pl-3 justify-center w-14 h-14">
        <FaWhatsapp className="text-2xl animate-bounce group-hover:rotate-360 transition-transform duration-300" />
      </div>

      {/* Text */}
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-4 font-semibold">
        Join Now
      </span>
    </Link>
  );
}

export default Whatsapp;
