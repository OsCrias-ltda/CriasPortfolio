import { BsAndroid, BsCloud, BsLaptop } from "react-icons/bs";
import ServiceCard from "./ServiceCard";
import { DiWebplatform } from "react-icons/di";

export default function Service() {
  return (
    <div id="Service" className="flex flex-col bg-gray-500 items-center justify-start m-auto">
      <h1 className="text-6xl p-12"> Serviços </h1>
      <div id="carrousel_Service" className="container bg-white flex sm:flex-row flex-col justify-center rounded-md border space-x-6 p-12 sm:p-6">
        <br></br>
        <ServiceCard
          icon={<DiWebplatform size={32} fill="red" />}
          title={"Websites"}
          text={
            "Desenvolvemos sites para quaisquer modelos de negócio, seja você um profissional autônomo ou empresa de pequeno, médio ou grande porte."
          }
        />
        <ServiceCard
          icon={<BsAndroid size={32} fill="red" />}
          title={"Aplicativos"}
          text={
            "Desenvolvemos aplicativos ideais para o seu negócio. Através das novas tendências e tecnologias do mercado criamos apps para colocar o seu negócio na palma da mão."
          }
        />
        <ServiceCard
          icon={<BsLaptop size={32} fill="red" />}
          title={"Sistemas Web"}
          text={
            "Desenvolvemos sistemas web voltados para o gerenciamento do seu negócio, focado na melhoria geral do sistema interno da empresa. Sistemas otimizados para o crescimento do seu negócio."
          }
        />
        <ServiceCard
          icon={<BsCloud size={32} fill="red" />}
          title={"Hospendagem e Manutenção"}
          text={
            "Oferecemos um serviço completo de hospedagem e manutenção para o seu site ou sistema web, garantindo que sua presença online seja sempre confiável e eficiente."
          }
        />
      </div>
    </div>
  );
}
