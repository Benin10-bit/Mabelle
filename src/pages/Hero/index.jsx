import hero from "../../assets/hero.png";

export default function Hero() {
  return (
    <div className="h-[100vh] bg-[#ffe6e5] text-[#713F3E] font-bold flex-col flex justify-center items-center">
      <img className="mt-16" src={hero} alt="hero da página" />
      <p className="text-xl mb-16 text-center">
        Costurando riqueza em cada detalhe.
      </p>
      <hr className="border-[E6F5F5] rounded mt-4 w-[40vw] my-4" />
      <p className="text-[1rem] mb-16 mt-2.5 font-normal text-center">
        Explore nosso catálogo abaixo:
      </p>

    </div>
  );
}
