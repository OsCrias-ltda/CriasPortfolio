"use client";

import { useEffect, useState } from "react";
import PortfolioCard from "./PortfolioCard";

export default function Portfolio(props: any) {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(
        "https://api.github.com/orgs/OsCrias-ltda/repos"
      );
      const data = await response.json();
      setRepo(data);
    };
    api();
  }, []);

  return (
    <div
      id="Portfolio"
      className="flex flex-col bg-gray-500 items-center place-items-center justify-start"
    >
      <h1 className="text-6xl p-12"> Portfolio </h1>
      <div
        id="content_portfolio"
        className=" mx-auto my-auto container justify-center border border-white rounded-md"
      >
        <div
          id="carrousel_portfolio"
          className="flex carousel space-x-11 px-12 m-4 rounded-xl justify-center items-center"
        >
          {
            // console.log(props)
            repo.map(function (repos: any) {
              return (
                <PortfolioCard
                  category="teste"
                  title={repos["name"]}
                  description={repos["description"]}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
