import Image from "next/image";

export default function AboutUs() {
  return (
    <div
      id="AboutUs"
      className="flex flex-col w-screen h-screen bg-gray-500 items-center justify-start space-y-24"
    >
      <h1 className="text-6xl p-12"> Sobre Nós </h1>

      <div
        id="content_AboutUs"
        className="container flex flex-row justify-center bg-white p-14 rounded-md space-x-10"
      >
        <div
          id="foto_AboutUs"
          className="flex-1 flex justify-center items-center"
        >
          <Image alt="dono" src="/Logo.png" width={250} height={250} />
        </div>

        <div
          id="foto_AboutUs"
          className="flex-1 flex flex-col items-start justify-start space-y-9 "
        >
          <h1 className="text-black text-4xl font-bold">Crias</h1>
          <p className="text-sm text-black">
            Lorem ipsum dolor sit amet. Cum eveniet similique vel omnis
            voluptatum in porro odit eos nihil vero rem illum voluptatem. Est
            rerum quia aut quia maiores eum debitis dolores ea possimus dolore.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
