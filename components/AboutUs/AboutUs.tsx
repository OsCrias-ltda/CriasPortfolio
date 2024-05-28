import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutUs(props: any) {
  const [user, setUser] = useState({
    name: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    const user = async () => {
      const response = await fetch("https://api.github.com/users/OsCrias-ltda");
      const data = await response.json();
      setUser(data);
    };

    user();
  }, []);

  return (
    <div
      id="AboutUs"
      className="flex flex-col bg-gray-500 items-center place-items-center justify-start space-y-24"
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
          <Image
            alt="avatar"
            className="rounded-lg"
            src={"/lulu.jpeg"}
            width={250}
            height={250}
          />
        </div>

        <div
          id="foto_AboutUs"
          className="flex-1 flex flex-col items-start justify-start space-y-9 "
        >
          <h1 className="text-black text-4xl font-bold">{user.name}</h1>
          <p className="text-sm text-black">{user.bio}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}
