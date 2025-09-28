import hero from "../../assets/hero.jpeg";

export default function Hero() {
  return (
    <div className="h-[110vh] bg-[#F5FFFF] text-[#4fbbbe] font-bold flex-col flex justify-center items-center">
      <img src={hero} alt="hero da página" />
      <p className="text-xl mb-16 text-center">
        A beleza que você merece, em cada detalhe.
      </p>
      <hr className="border-[E6F5F5] rounded mt-4 w-[40vw] my-4" />

    </div>
  );
}
