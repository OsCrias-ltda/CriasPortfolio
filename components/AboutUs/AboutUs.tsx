import Image from "next/image";

export default function AboutUs(props:any) {
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
          <Image alt="avatar" className="rounded-lg" src={props.data.avatar_url} width={250} height={250} />
        </div>

        <div
          id="foto_AboutUs"
          className="flex-1 flex flex-col items-start justify-start space-y-9 "
        >
          <h1 className="text-black text-4xl font-bold">{props.data.name}</h1>
          <p className="text-sm text-black">
            {props.data.bio}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
