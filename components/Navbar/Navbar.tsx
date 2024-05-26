import Link from "next/link";
import Image from "next/image";
import { text_normal } from "@/app/page";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBar() {
  return (
    <div
      id="Navbar"
      className="flex flex-col justify-around text-center w-screen h-[100px] min-w-fit bg-gray-500 rounded-b-sm fixed sm:static z-20"
    >
      <div className="flex flex-row w-0 h-0 sm:w-screen sm:h-[100px] invisible sm:visible">
        <div
          id="Logo"
          className="flex-1  flex items-center justify-items-start p-12"
        >
          <Image src={"/Logo.png"} width={64} height={64} alt={"logo"} />
        </div>
        <div
          id="links"
          className={
            "flex-1 flex items-center justify-center w-fit space-x-5 invisible sm:visible " +
            text_normal.className
          }
        >
          <Link href="/#Home" scroll={true}>
            Home
          </Link>
          <Link href="/#Service">Serviços</Link>
          <Link href="/#Portfolio">Portfolio</Link>
          <Link href="/#AboutUs">Quem Somos</Link>
          <Link href="/#Contact">Contato</Link>
        </div>
      </div>

      <div className="navbar sm:invisible">
        <div className="flex-1 px-2 lg:flex-none">
          <Image src={"/Logo.png"} width={64} height={64} alt={"logo"} />
        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-btn"
              >
                <GiHamburgerMenu size={32} />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <Link href="/#Home">
                  Home
                </Link>
                <Link href="/#Service">Serviços</Link>
                <Link href="/#Portfolio">Portfolio</Link>
                <Link href="/#AboutUs">Quem Somos</Link>
                <Link href="/#Contact">Contato</Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
