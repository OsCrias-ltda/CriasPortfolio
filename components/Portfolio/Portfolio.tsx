import PortfolioCard from "./PortfolioCard";

export default function Portfolio() {
  return (
    <div
      id="Portfolio"
      className="flex flex-col bg-gray-500 items-center justify-start"
    >
      <h1 className="text-6xl p-12"> Portfolio </h1>
      <div
        id="content_portfolio"
        className=" mx-auto my-auto container justify-center border border-white rounded-md"
      >
        <div
          id="carrousel_portfolio"
          className="flex carousel space-x-11 px-12 m-4 rounded-xl"
        >
          <PortfolioCard category="teste" title="bolo" description="sei lá" />
          <PortfolioCard category="teste" title="bolo" description="sei lá" />
          <PortfolioCard category="teste" title="bolo" description="sei lá" />
          <PortfolioCard category="teste" title="bolo" description="sei lá" />
        </div>
      </div>
    </div>
  );
}
