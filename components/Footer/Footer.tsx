import Image from "next/image";
import { text_normal } from "@/app/page";

export default function Footer() {
  return (
    <div
      id="Footer"
      className="flex flex-row place-items-center text-center w-screen h-[200px] bg-gray-600 rounded-t-sm space-x-12 "
    >
      <div
        id="Logo"
        className="flex items-center justify-items-start w-1/3  p-12"
      ></div>

      <div
        id="design_by"
        className="flex flex-1 flex-col justify-center w-1/3 items-center text-center"
      >
        <h1>Designer by:</h1>
        <p>Crias Ltda</p>
      </div>

      <div
        id="links"
        className={
          "flex flex-col items-center justify-center w-1/3 h-fit space-y-1 text-sm " +
          text_normal.className
        }
      >
        <p> Contato: </p>
        <a href={""}> Instagram </a>
        <a href={""}> Github </a>
        <a href={""}> Linkedin </a>
      </div>
    </div>
  );
}
