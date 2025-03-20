import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-6 ">
      <div className="text-center md:text-left">
        <Link to="/">
          <img
            src="/Designer-removebg-preview.png"
            alt="logo"
            className="w-24 h-24 mx-auto md:mx-0"
          />
        </Link>
        <div className="mt-2 space-x-4">
          <Link className="text-white hover:text-[#582aa8] font-bold" to="/">
            Home
          </Link>
          <Link className="text-white hover:text-[#582aa8] font-bold" to="/">
            Jobs
          </Link>
          <Link className="text-white hover:text-[#582aa8] font-bold" to="/">
            Browse
          </Link>
        </div>
        <p className="mt-2">CodingWithVishal &copy; 2024</p>
      </div>

      <div className="text-center md:text-left">
        <h2 className="text-[#6A38C2] text-lg font-semibold">Contact info</h2>
        <h4 className="mt-1">
          📍M-Pocket Ganga Nagar <br /> Meerut U.P.
        </h4>
        <h5 className="mt-1">
          <a
            href="mailto:vishalpandit3456g@gmail.com"
            className="text-white hover:text-[#582aa8]"
          >
            Email: vishalpandit3456g@gmail.com
          </a>
        </h5>
      </div>

      <div className="text-center md:text-right">
        <h2 className="text-[#6A38C2] text-lg font-semibold">About Us</h2>
        <h4 className="mt-1">
          "Elevating Ideas into Seamless Web Solutions - <br />
          Where Innovation Meets Precision in Development"
        </h4>
        <div className="mt-2 space-x-4 text-2xl">
          <a href="https://www.facebook.com/pandit.vishalguru" className="text-blue-700 hover:opacity-75">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-blue-400 hover:opacity-75">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/pandatvishal315/" className="text-pink-500 hover:opacity-75">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-blue-600 hover:opacity-75">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
