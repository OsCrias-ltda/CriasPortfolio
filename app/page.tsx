import AboutUs from "@/components/AboutUs/AboutUs";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Home from "@/components/Home/Home";
import NavBar from "@/components/Navbar/Navbar";
import Portfolio from "@/components/Portfolio/Portfolio";
import Service from "@/components/Service/Service";
import { NextFont } from "next/dist/compiled/@next/font";
import { Montserrat } from "next/font/google";

export const text_normal: any = Montserrat({ subsets: ["latin"] });
export let orgs_info: any;
export let orgs_repos: any

export default function Page() {

  async function start() {
    const user = async () => {
      const response = await fetch("https://api.github.com/users/OsCrias-ltda");
      const data = await response.json();

      return data;
    };

    const api = async () => {
      const response = await fetch(
        "https://api.github.com/orgs/OsCrias-ltda/repos"
      );
      const data = await response.json();

      return data;
    };

    const api_data = await api();
    const user_data = await user();

    orgs_info = user_data;
    orgs_repos = api_data;
  }

  // Carrega os cards
  start();

  return (
    <div className={"bg-red-500 overflow-hidden " + text_normal.className}>
      <NavBar />
      <Home />
      <Service />
      <Portfolio data={orgs_repos} />
      <AboutUs data={orgs_info} />
      <Contact />
      <Footer />
    </div>
  );
}
