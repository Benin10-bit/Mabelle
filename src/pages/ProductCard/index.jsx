import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalAviso from "../ModalAviso";

export default function ProductCard({
  title,
  description,
  price,
  image,
  stock = 0,
  produtoId,
}) {
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const getStockBadgeColor = () => {
    if (isOutOfStock) return "bg-[#C85A5A]";
    if (isLowStock) return "bg-[#E8A26D]";
    return "bg-[#9C5A59]";
  };

  const getStockText = () => {
    if (isOutOfStock) return "Sem estoque";
    if (isLowStock) return `Restam ${stock}`;
    return `${stock} disponíveis`;
  };

  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [progresso, setProgresso] = useState(0);
  const [atualizar, setAtualizar] = useState(0);

  console.log(atualizar)

  useEffect(() => {
    const handleStorageChange = () => setAtualizar(prev => prev + 1);
    window.addEventListener("storageChange", handleStorageChange);
    return () => window.removeEventListener("storageChange", handleStorageChange);
  }, []);

  function mostrarAviso(msg) {
    setModalAberto(true);
    setMensagem(msg);
    setProgresso(0);
    let progressoAtual = 0;
    const intervalo = setInterval(() => {
      progressoAtual += 1;
      setProgresso(progressoAtual);
      if (progressoAtual >= 100) {
        clearInterval(intervalo);
        setModalAberto(false);
      }
    }, 30);
    return () => clearInterval(intervalo);
  }

  function carrinho(id) {
    mostrarAviso("💖 Adicionado ao carrinho");
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(id);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.dispatchEvent(new Event("storageChange"));
  }

  // Nova função para redirecionar com parâmetros na URL
  function verMais() {
    const queryParams = new URLSearchParams({
      title,
      description,
      price,
      image,
      stock,
    }).toString();

    navigate(`/produto-detalhes?${queryParams}`);
  }

  return (
    <div className="bg-[#F7EAEA] max-w-sm w-full rounded-2xl shadow-lg overflow-hidden hover:shadow-[0_0_20px_rgba(156,90,89,0.3)] transition-shadow relative duration-300 mx-auto flex flex-col">
      <ModalAviso mensagem={mensagem} isOpen={modalAberto} progresso={progresso} />

      <div className="absolute top-3 right-3 z-10">
        <span className={`${getStockBadgeColor()} text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md`}>
          {getStockText()}
        </span>
      </div>

      <img src={image} alt={title} className="w-full h-56 object-cover border-b-4 border-[#E9D9D9]" />

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-2xl font-bold text-[#5B3A39] mb-2">{title}</h2>
          <p className="text-[#8C6E6D] mb-6">{description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-semibold text-[#9C5A59]">{formattedPrice}</span>

          <div className="flex gap-3">
            <button
              className={`px-4 py-2 rounded-xl font-medium transition-colors duration-300 ${isOutOfStock ? "bg-[#E9D9D9] text-[#8C6E6D] cursor-not-allowed" : "bg-[#B87776] text-white hover:bg-[#9C5A59] cursor-pointer"}`}
              onClick={isOutOfStock ? undefined : verMais}
              disabled={isOutOfStock}
            >
              Ver Mais
            </button>

            <button
              className={`px-4 py-2 rounded-xl font-medium transition-colors duration-300 ${isOutOfStock ? "bg-[#E9D9D9] text-[#8C6E6D] cursor-not-allowed" : "bg-[#9C5A59] text-white hover:bg-[#5B3A39] cursor-pointer"}`}
              onClick={isOutOfStock ? undefined : () => carrinho(produtoId)}
              disabled={isOutOfStock}
            >
              <i className="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
