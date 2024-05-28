"use client";

import AboutUs from "@/components/AboutUs/AboutUs";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Home from "@/components/Home/Home";
import NavBar from "@/components/Navbar/Navbar";
import Portfolio from "@/components/Portfolio/Portfolio";
import Service from "@/components/Service/Service";
import { Montserrat } from "next/font/google";
  
const text_normal = Montserrat({ subsets: ["latin"] });

export default function Page() {
  return (
    <div className={"bg-gray-500 overflow-hidden " + text_normal.className}>
      <NavBar />
      <Home />
      <Service />
      <Portfolio  />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
}
