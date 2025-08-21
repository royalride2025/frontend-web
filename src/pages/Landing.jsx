import React, { useState } from "react";
import logo from "../assets/logo.svg";
import footerLogo from "../assets/footerLogo.svg";
import flag from "../assets/flag.svg";
import heroImg from "../assets/hero-img.png";
import calander from "../assets/calander.svg";
import img1 from "../assets/img-1.png";
import img2 from "../assets/img-22.png";
import img3 from "../assets/img-3.png";
import img4 from "../assets/img-4.png";
import ficon4 from "../assets/f-icon-4.svg";
import ficon3 from "../assets/f-icon-3.svg";
import ficon2 from "../assets/f-icon-2.svg";
import ficon1 from "../assets/f-icon-1.svg";
import storyImg1 from "../assets/storyImg1.png";
import storyImg2 from "../assets/storyImg2.png";
import fleet1 from "../assets/fleet1.png";
import fleet2 from "../assets/fleet2.png";
import fleet3 from "../assets/fleet3.png";
import passangerSvg from "../assets/passanger.svg";
import luggageSvg from "../assets/luggage.svg";
import arrowDownSvg from "../assets/arrowDown.svg";
import suv2 from "../assets/suv2.png";
import { ArrowRight, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import './landing.css'


function Landing() {
  const [language, setLanguage] = useState("QR");
  const features = [
    {
      icon: ficon1,
      title: "Safety First",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: ficon2,
      title: "Reasonable Rates",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: ficon3,
      title: "Largest Fleet",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: ficon4,
      title: "Nationwide Service",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

   const vehicles = [
    {
      id: 1,
      name: "Lexus 600",
      image: fleet1,
      passengers: 2,
      luggage: 2,
      category: "luxury",
    },
    {
      id: 2,
      name: "Land Rover Defender",
      image: fleet2,
      passengers: 6,
      luggage: 4,
      category: "crossover",
    },
    {
      id: 3,
      name: "Rolls Royce Cullinan",
      image: fleet3,
      passengers: 4,
      luggage: 4,
      category: "luxury",
    },
  ]

  const categories = [
    { id: "all", label: "All", active: true },
    { id: "luxury", label: "Luxury", active: false },
    { id: "business", label: "Business", active: false },
    { id: "crossover", label: "Crossover", active: false },
  ]

  return (
    <>
    <div className='bg-[#212121] text-white min-h-screen'>
      <div className="min-h-screen bg-transparent">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-transparent">
          <div className="relative flex justify-center items-center">
            <img
              src={logo}
              alt="White luxury SUV"
              className="w-16 h-16 md:w-full max-w-2xl md:h-auto object-contain"
            />
          </div>

          <nav className="hidden md:flex space-x-8 text-white">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              About us
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Our Services
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Our Fleets
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Cooperation
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#161616] px-3 py-2 rounded-sm">
              <div className="w-6  rounded-sm">
                <img
                  src={flag}
                  alt="White luxury SUV"
                  className="w-full max-w-2xl h-auto object-contain"
                />
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none text-sm"
              >
                <option value="QR" className="bg-gray-800">
                  QR
                </option>
                <option value="EN" className="bg-gray-800">
                  EN
                </option>
              </select>
            </div>

            <button className="grid grid-cols-3 gap-1 w-8 h-8 p-1 cursor-pointer">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                ></div>
              ))}
            </button>

            {/* Register as Driver Button */}
            <button
              className="bg-[#e3c28d] hover:bg-[#caac7c] text-black px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ml-4"
              onClick={() => window.location.href = '/auth/register-driver'}
            >
              Register as Driver
            </button>
          </div>
        </header>

        {/* Main Hero Section */}

        <div
          className="flex flex-col justify-between align-middle py-8 md:mx-[3rem] mx-[1.5rem] md:min-h-[700px] full h-full bg-center bg-cover bg-no-repeat rounded-xl overflow-hidden border-0 border-red-500 "
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="relative z-10 w-full  mx-auto">
            <div className="flex flex-col lg:flex-row lg:flex-cols-2 gap-8 justify-between  items-start py-4 px-7 lg:px-10 ">
              <div>
                <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 leading-none">
                  Royal Ride
                </h1>
                <h2 className="text-3xl lg:text-5xl font-medium text-gray-900 mt-2">
                  VIP Transfers
                </h2>
              </div>

              <div>
                <p className="text-gray-700 text-[.9rem] leading-relaxed max-w-sm mb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>

                <button className="bg-[#e3c28d] hover:bg-[#caac7c] text-black px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
                  Open Fleet
                </button>
              </div>
            </div>
          </div>

          {/* Booking Form design*/}
          <div className="w-[90%] mx-auto p-4">
            <div className="bg-[#c5c5c6] rounded-lg p-2 px-4  flex items-center justify-between gap-6 overflow-y-auto border-2 border-[#e2e2e4]">
              {/* Pickup Address */}
              <div className="flex-1 min-w-[8rem]">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  Pickup Address
                </h3>
                <p className="text-sm font-medium text-gray-900">
                  From address,airport
                </p>
              </div>

              {/* Divider */}
              <div className="h-12 w-[2px] bg-[#e2e2e4]"></div>

              {/* Drop off Address */}
              <div className="flex-1 min-w-[8rem]">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  Drop off Address
                </h3>
                <p className=" text-sm font-medium text-gray-900">
                  Distance, Hourly, Flat rate
                </p>
              </div>

              {/* Divider */}
              <div className="h-12 w-[2px] bg-[#e2e2e4]"></div>

              {/* Pick Up Date */}
              <div className="flex-1 min-w-[8rem]">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  Pick Up Date
                </h3>
                <p className="text-gray-900 text-sm font-medium">
                  APR 19, 2025
                </p>
              </div>

              {/* Divider */}
              <div className="h-12 w-[2px] bg-[#e2e2e4]"></div>

              {/* Pick Up Time */}
              <div className="flex-1 min-w-[8rem]">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  Pick Up Time
                </h3>
                <p className="text-gray-900 text-sm font-medium">12 : 35 am</p>
              </div>

              {/* Book Now Button */}
              <button className="min-w-[8rem] bg-[#e3c28d] hover:bg-[#caac7c] text-gray-900 font-semibold px-3 lg:px-12 py-3 rounded-lg flex flex-col items-center gap-2 h-auto cursor-pointer">
                {/* <Calendar className="w-4 h-4" /> */}
                <div className="w-6  rounded-sm">
                  <img
                    src={calander}
                    alt="White luxury SUV"
                    className="w-full max-w-2xl h-auto object-contain"
                  />
                </div>
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* services section*/}
        <div className="w-[83%] mx-auto p-4 py-10 border-0 border-red-500">
          <div className="bg-transparent  md:flex items-center justify-between gap-4 border-0 border-red-500">
            <div className="w-full md:w-[40%] text-white flex flex-col gap-4  mb-5 md:mb-0 border-0 border-red-500">
              <div className="border-0 border-red-500">
                <div>
                  <span className="text-3xl lg:text-5xl font-thin mt-2 me-3">
                    Our
                  </span>
                  <span className="text-3xl lg:text-5xl font-bold mt-2">
                    Services
                  </span>
                </div>
                <p className=" text-sm leading-relaxed max-w-sm mb-4 mt-8">
                  We understand that every event is unique, and we strive to
                  commodate your individual needs.
                </p>
              </div>
              <div className="rounded-md border-0 border-red-500">
                <img
                  src={img1}
                  alt="img1"
                  className="w-full max-w-2xl h-auto object-contain"
                />
              </div>
            </div>

            <div className="w-full md:w-[60%] flex gap-4 border-0 border-red-500 ">
              <div className="w-[50%] rounded-md border-0 border-red-500">
                <img
                  src={img2}
                  alt="img1"
                  className="w-full max-w-2xl h-auto object-contain"
                />{" "}
              </div>

              <div className="w-[50%] flex flex-col gap-4 border-0 border-red-500 ">
                <div className="rounded-md border-0 border-red-500">
                  <img
                    src={img3}
                    alt="img1"
                    className="w-full max-w-2xl h-auto object-contain"
                  />{" "}
                </div>
                <div className="rounded-md border-0 border-red-500">
                  <img
                    src={img4}
                    alt="img1"
                    className="w-full max-w-2xl h-auto object-contain"
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}

        <div className="max-w-7xl mx-[1rem] lg:mx-auto py-10 border-0 border-red-500">
          <div className="bg-[#e3c28d] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center lg:text-left">
                    {/* Icon */}
                    <div className="md:flex justify-start mb-4 border-0 border-red-500">
                      <div 
                        className="w-16 h-16 mx-auto md:mx-0 md:me-3 bg-[#e3c28d] rounded-lg mb-2 md:mb-0 flex items-center justify-center border-0 border-red-500"
                        
                        >
                        <img
                          src={IconComponent}
                          alt="Feature Icon"
                          className="w-full max-w-2xl h-auto object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* story section */}
        <section className="max-w-7xl mx-[1rem] lg:mx-auto py-10 border-0 border-red-500">
          <div className="w-[85%] mx-auto border-0 border-red-500">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
              {/* Left Column - Main Heading and Description */}
              <div className="mb-8 lg:mb-0 ">
                <div className=" mb-8">
                  <span className="text-3xl lg:text-5xl font-thin mt-2 me-3">
                    Our
                  </span>
                  <span className="text-3xl lg:text-5xl font-bold mt-2">
                    Story
                  </span>
                </div>
                <p className="text-sm leading-relaxed max-w-sm">
                  We understand that every event is unique, and we strive to
                  accommodate your individual needs.
                </p>
              </div>

              {/* Right Column - Lorem Ipsum Text */}
              <div className="text-sm leading-relaxed lg:max-w-[40%]">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>

            {/* Visual Elements Grid */}
            <div className="flex flex-col lg:flex-row gap-6 border-0 border-red-500">
              {/* Statistics Card */}
              <div className="flex-1 bg-[#e3c28d] rounded-2xl p-8 max-w-[90%] mx-auto flex flex-col justify-center items-center text-center text-black">
                <div className="text-6xl font-bold mb-4">+80k</div>
                <p className="text-medium font-medium">
                  Served customers all over the country
                </p>
              </div>

              {/* Business Meeting Image */}
              <div className="flex-1 rounded-2xl overflow-hidden max-w-[100%] mx-auto border-0 border-red-500">
                <img
                  src={storyImg2}
                  alt="Feature Icon"
                  className="w-full max-w-2xl h-auto object-contain mx-auto"
                />
              </div>

              {/* Car Interior Image */}
              <div className="flex-2 rounded-2xl overflow-hidden max-w-[100%] mx-auto  border-0 border-red-500">
                <img
                  src={storyImg1}
                  alt="Feature Icon"
                  className="w-full max-w-2xl h-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Section */}
        <section className="max-w-7xl mx-[1rem] lg:mx-auto py-10 border-0 border-red-500">
          <div className="bg-[#6f614c] max-w-7xl mx-[1rem] lg:mx-auto py-10 rounded-2xl border-0 border-red-500">
            <div className="mx-auto w-[85%]">
              {/* Header */}
              <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end border-0 border-red-500">
                <div className="max-w-md border-0 border-red-500">
                  <div className=" mb-8">
                    <span className="text-3xl lg:text-5xl font-thin mt-2 me-3">
                      Our
                    </span>
                    <span className="text-3xl lg:text-5xl font-bold mt-2">
                      Fleet
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed max-w-sm">
                    We understand that every event is unique, and we strive to
                    accommodate your individual needs.
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 border-0 border-red-500">
                  {categories.map((category, i) => (
                    <React.Fragment key={category.id}>
                      {/* Button */}
                      <button
                        className={
                          category.active
                            ? "bg-[#e3c28d] text-black hover:bg-[#D4B896]/90 border-0 px-2 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                            : "border-white/30 bg-transparent text-white hover:bg-white/10 px-2 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        }
                      >
                        {category.label}
                      </button>

                      {i !== 0 && i !== categories.length - 1 && (
                        <span className="border-l border-white h-6 mx-1 md:mx-2 self-center inline-flex"></span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Vehicle Grid */}
              <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 border-0 border-red-500">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="overflow-hidden border-0 border-red-500"
                  >
                    <div className="aspect-[4/3] rounded-2xl bg-white p-6">
                      <img
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        width={300}
                        height={200}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="pt-6">
                      <h3 className="mb-4 text-xl md:text-2xl font-semibold text-white">
                        {vehicle.name}
                      </h3>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-2 bg-[#b1ada7] text-black hover:bg-[#b1ada7]/20 p-2 rounded-md cursor-pointer">
                          <img
                            src={passangerSvg}
                            alt="passenger"
                            className="w-4 h-4 object-contain"
                          />
                          <span>{vehicle.passengers}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#b1ada7] text-black hover:bg-[#b1ada7]/20 p-2 rounded-md cursor-pointer">
                          <img
                            src={luggageSvg}
                            alt="luggage"
                            className="w-4 h-4 object-contain"
                          />
                          <span>{vehicle.luggage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Open All Vehicles Button */}
              <div className="text-center border-0 border-red-500">
                <button
                  variant="outline"
                  className="flex items-center gap-2 mx-auto rounded-md bg-[#e3c28d] text-black hover:bg-[#D4B896]/90 px-8 py-3 text-sm font-medium cursor-pointer"
                >
                  {/* <ChevronDown className="mr-2 h-5 w-5" /> */}
                  <img
                    src={arrowDownSvg}
                    alt="luggage"
                    className="w-3 h-3 object-contain"
                  />
                  Open All Vehicles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Your next travel */}
        <div className=" flex items-center justify-center mx-[1rem] lg:mx-auto py-10 overflow-visible border-0 border-red-500">
          <div className="relative w-full max-w-7xl bg-[#e3c28d] rounded-3xl overflow-visible shadow-2xl border-0 border-red-500">
            <div className=" relative flex flex-col md:flex-row md:items-end items-center justify-around overflow-visible border-0 border-red-500">
              {/* Car Image Section */}
              <div className="w-full max-w-md md:flex-1 flex  justify-center pl-4 pr-8 pb-4  relative -mt-8 z-10  border-0 border-red-500">
                <div className="relative w-full">
                  <img
                    src={suv2}
                    alt="White Rolls-Royce luxury SUV"
                    // width={600}
                    // height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-center p-8  border-0 border-red-500">
                <div className="space-y-6 text-black">
                  <div className=" mb-8 max-w-lg">
                    <span className="text-3xl lg:text-5xl font-thin mt-2 me-3">
                      Your Next
                    </span>
                    <span className="text-3xl lg:text-5xl font-bold mt-2">
                      Travel With us?
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed max-w-sm">
                    We understand that every event is unique.
                  </p>

                  <div className="pt-4">
                    <button
                        className=" bg-white border-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        
                      >
                        Calculate Now
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
         <footer className=" text-black mx-[1rem] lg:mx-auto py-10 border-0 border-red-500">
      <div className="bg-white rounded-3xl max-w-7xl mx-auto px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Newsletter Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
               <img
              src={footerLogo}
              alt="White luxury SUV"
              className="w-20 h-20 object-contain"
            />
            </div>

            <div>
              <h3 className="text-black font-medium mb-4">Subscribe to the newsletter</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email..."
                  className="bg-[#e8e8e8] text-black placeholder-[#b8b8b8] p-2 px-4 rounded-l-md focus:ring-0 focus:border-gray-600"
                />
                <button size="icon" className="bg-black text-white hover:bg-gray-800 p-3 rounded-r-md">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Top Cities */}
          <div>
            <h3 className="text-black font-medium mb-6">Top cities</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Doha
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Riyadh
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Dubai
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Jeddah
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Manama
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-black font-medium mb-6">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Intercity rides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Limousine service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Chauffeur service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Private car service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  Airport transfer
                </a>
              </li>
            </ul>
          </div>

          {/* Intercity Rides */}
          <div>
            <h3 className="text-black font-medium mb-6">Intercity rides</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  East Hampton - Newyork
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  East Hampton - Newyork
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  East Hampton - Newyork
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  East Hampton - Newyork
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  East Hampton - Newyork
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
              <p className="text-black text-sm md:mr-[5rem]">© 2025 Royal Ride</p>
              <nav className="flex flex-wrap justify-center md:justify-start space-x-6">
                <a href="#" className="text-gray-400 hover:text-black text-sm transition-colors">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-black text-sm transition-colors">
                  Privacy policy
                </a>
                <a href="#" className="text-gray-400 hover:text-black text-sm transition-colors">
                  Legal notice
                </a>
                <a href="#" className="text-gray-400 hover:text-black text-sm transition-colors">
                  Accessibility
                </a>
              </nav>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
      </div>
      </div>
    </>
  );
}

export default Landing;
