import { useState } from "react";
import ModalAviso from "../ModalAviso";

export default function ProductCard({
  title,
  description,
  price,
  image,
  stock = 0,
  produtoId,
}) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const getStockBadgeColor = () => {
    if (isOutOfStock) return "bg-red-500";
    if (isLowStock) return "bg-orange-500";
    return "bg-green-500";
  };

  const getStockText = () => {
    if (isOutOfStock) return "Sem estoque";
    if (isLowStock) return `Restam ${stock}`;
    return `${stock} disponíveis`;
  };

  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [progresso, setProgresso] = useState(0);

  function mostrarAviso(mensagem) {
    setModalAberto(true);
    setMensagem(mensagem);
    setProgresso(0);

    let progressoAtual = 0;
    const intervalo = setInterval(() => {
      progressoAtual += 1;
      setProgresso(progressoAtual);

      if (progressoAtual >= 100) {
        // ajuste para 100
        clearInterval(intervalo);
        setModalAberto(false);
      }
    }, 30);

    return () => clearInterval(intervalo); // limpa se necessário
  }

  function carrinho(id) {
    mostrarAviso("✅ Adicionado ao carrinho");
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(id);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.dispatchEvent(new Event("storageChange"));
  }

  return (
    <div
      className="bg-[#E6F5F5] max-w-sm w-full rounded-2xl shadow-lg overflow-hidden 
                 hover:shadow-[0_0_20px_rgba(43,174,172,0.5)] transition-shadow relative duration-300 mx-auto"
    >
      <ModalAviso
        mensagem={mensagem}
        isOpen={modalAberto}
        progresso={progresso}
      />
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`${getStockBadgeColor()} text-white text-xs font-semibold 
                      px-2 py-1 rounded-full shadow-md`}
        >
          {getStockText()}
        </span>
      </div>

      {/* Imagem do produto */}
      <img src={image} alt={title} className="w-full h-56 object-cover" />

      {/* Conteúdo */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#0F3E3D] mb-2">{title}</h2>
        <p className="text-[#4B6968] mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-[#0F3E3D]">
            {formattedPrice}
          </span>
          <button
            className={`px-4 py-2 rounded-xl transition-colors duration-300 ${
              isOutOfStock
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-[#3CCAC8] text-white hover:bg-[#2BAEAC] cursor-pointer"
            }`}
            onClick={isOutOfStock ? undefined : () => carrinho(produtoId)}
            disabled={isOutOfStock}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
