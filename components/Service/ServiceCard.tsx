import Image from "next/image";


export default function ServiceCard(props: any) {
  return (
    <div
      id="carrousel_service_card"
      className="flex flex-col bg-white text-center rounded-3xl m-2 py-12 space-y-10 shadow-md"
    >
      <div
        id="card_service_logo"
        className="flex justify-center items-center"
      >
        <Image src={props.image} width={32} height={32} alt="Logo" />
      </div>
      <div id="card_service_content" className="flex flex-auto flex-col p-2 space-y-4 h-32 justify-center items-center">
        <p className="text-black">{props.title}</p>
        <p className="text-black">{props.text}</p>
      </div>
    </div>
  );
}
