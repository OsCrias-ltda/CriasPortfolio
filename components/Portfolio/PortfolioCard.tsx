import Image from "next/image";

export default function PortfolioCard(props: any) {
  return (
    <div className="carousel-item relative group duration-500 cursor-pointer group overflow-hidden text-gray-50 h-72 rounded-3xl hover:duration-700 duration-700 bg-white">
      <div className="w-56 h-72 bg-[url('/Logo.png')] bg-center text-gray-800 rounded-3xl">
        <div className="flex flex-row justify-between"></div>
      </div>
      <div className="absolute bg-gray-50 -bottom-24 w-56 p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500 rounded-3xl">
        <span className="text-lime-400 font-bold text-xs">{props.category}</span>
        <span className="text-gray-800 font-bold text-3xl">{props.title}t</span>
        <p className="text-neutral-800">
          {props.description}
        </p>
      </div>
    </div>
  );
}
