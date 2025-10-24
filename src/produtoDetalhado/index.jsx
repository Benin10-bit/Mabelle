import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MabelleFooter from "../pages/Footer";

export default function ProductDetails() {
  const [searchParams] = useSearchParams();

  // Extraindo parâmetros da URL
  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";
  const price = parseFloat(searchParams.get("price")) || 0;
  const image = searchParams.get("image") || "";
  const stock = parseInt(searchParams.get("stock")) || 0;
  const produtoId = searchParams.get("produtoId") || "";

  function sendToWhatsApp() {
    // Verificação básica
    if (!title || !price) return;

    // Formata o preço
    const formattedPrice = price.toFixed(2).replace(".", ",");

    // Monta a mensagem
    const message = `
Olá! 👋
Gostaria de saber mais sobre este produto:

🧵 *${title}*
📖 ${description ? description : "Sem descrição disponível"}
💰 *R$ ${formattedPrice}*
📦 Código: ${produtoId}
${stock > 0 ? `Disponibilidade: ${stock} em estoque` : "Produto esgotado"}
${image ? `\n🖼️ Veja a imagem: ${image}` : ""}
`;

    // Codifica e envia pelo WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/558494833000?text=${encodedMessage}`;
    window.open(waLink, "_blank");
  }

  const [quantidade] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [progresso, setProgresso] = useState(0);
  const [imagemPrincipal] = useState(image);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price * quantidade);

  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const getStockBadgeColor = () => {
    if (isOutOfStock) return "bg-[#D97A7A]";
    if (isLowStock) return "bg-[#E9C77B]";
    return "bg-[#90B29E]";
  };

  const getStockText = () => {
    if (isOutOfStock) return "Produto esgotado";
    if (isLowStock) return `Apenas ${stock} unidades restantes!`;
    return `${stock} unidades disponíveis`;
  };

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
  }

  function adicionarAoCarrinho() {
    if (isOutOfStock) return;

    mostrarAviso(
      `💖 ${quantidade} ${
        quantidade === 1 ? "item adicionado" : "itens adicionados"
      } ao carrinho`
    );
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

    // Adiciona a quantidade selecionada
    for (let i = 0; i < quantidade; i++) {
      carrinho.push(produtoId);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.dispatchEvent(new Event("storageChange"));
  }

  function comprarAgora() {
    if (isOutOfStock) return;
    sendToWhatsApp
  }

  // Modal de Aviso Component
  const ModalAviso = () =>
    modalAberto && (
      <div className="fixed top-4 right-4 z-50 animate-slideIn">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#9C5A59] min-w-[300px]">
          <p className="text-[#5B3A39] font-semibold text-center mb-3">
            {mensagem}
          </p>
          <div className="w-full h-2 bg-[#E9D9D9] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9C5A59] to-[#B87776] transition-all duration-100"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F7EAEA]">
      <ModalAviso />

      {/* Header com botão voltar */}
      <div className="bg-gradient-to-r from-[#9C5A59] to-[#713F3E] py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => window.history.back()}
            className="text-[#F7EAEA] hover:text-[#EBD2D2] transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-[#E9D9D9]">
              <img
                src={imagemPrincipal}
                alt={title}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />

              {/* Badge de estoque */}
              <div className="absolute top-4 right-4">
                <span
                  className={`${getStockBadgeColor()} text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg`}
                >
                  {getStockText()}
                </span>
              </div>
            </div>

          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#5B3A39] mb-3">
                {title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-[#E9C77B]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-[#8C6E6D] text-sm">(128 avaliações)</span>
              </div>
            </div>

            <div className="bg-[#E9D9D9] rounded-2xl p-6 border-2 border-[#EBD2D2]">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-[#713F3E]">
                  {formattedPrice}
                </span>
                <span className="text-[#8C6E6D] text-sm line-through">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(price * 1.3)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#5B3A39] mb-3">
                Descrição
              </h3>
              <p className="text-[#8C6E6D] leading-relaxed">{description}</p>
            </div>

            {/* Características */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#EBD2D2]">
              <h3 className="text-lg font-semibold text-[#5B3A39] mb-4">
                Características
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[#8C6E6D]">
                  <span className="text-[#90B29E]">✓</span>
                  <span>Material de alta qualidade</span>
                </li>
                <li className="flex items-center gap-3 text-[#8C6E6D]">
                  <span className="text-[#90B29E]">✓</span>
                  <span>Feito à mão com cuidado artesanal</span>
                </li>
                <li className="flex items-center gap-3 text-[#8C6E6D]">
                  <span className="text-[#90B29E]">✓</span>
                  <span>Garantia de 15 dias</span>
                </li>
                <li className="flex items-center gap-3 text-[#8C6E6D]">
                  <span className="text-[#90B29E]">✓</span>
                  <span>Entrega em toda Caicó</span>
                </li>
              </ul>
            </div>

            {/* Seletor de Quantidade */}
            {!isOutOfStock && (
              <div>
                <h3 className="text-lg font-semibold text-[#5B3A39] mb-3">
                  Quantidade
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center bg-white rounded-xl border-2 border-[#E9D9D9] overflow-hidden">
                    <span className="px-6 py-3 font-semibold text-[#5B3A39] min-w-[60px] text-center">
                      {quantidade}
                    </span>
                  </div>
                  <div className="text-[#8C6E6D]">
                    <span className="text-sm">Total:</span>
                    <span className="text-2xl font-bold text-[#9C5A59] ml-2">
                      {formattedTotal}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={adicionarAoCarrinho}
                disabled={isOutOfStock}
                className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? "bg-[#E9D9D9] text-[#8C6E6D] cursor-not-allowed"
                    : "bg-[#B87776] text-white hover:bg-[#9C5A59] hover:shadow-lg transform hover:scale-105"
                }`}
              >
                🛒 {isOutOfStock ? "Produto Esgotado" : "Adicionar ao Carrinho"}
              </button>

              <button
                onClick={comprarAgora}
                disabled={isOutOfStock}
                className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? "bg-[#E9D9D9] text-[#8C6E6D] cursor-not-allowed"
                    : "bg-[#713F3E] text-white hover:bg-[#5B3A39] hover:shadow-lg transform hover:scale-105"
                }`}
              >
                ⚡ Comprar Agora
              </button>
            </div>

            {/* Informações de Entrega */}
            <div className="bg-gradient-to-r from-[#EBD2D2] to-[#E9D9D9] rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[#9C5A59] text-2xl mb-2">🚚</div>
                  <p className="text-sm font-semibold text-[#5B3A39]">
                    Frete Grátis
                  </p>
                  <p className="text-xs text-[#8C6E6D]">Acima de R$ 150</p>
                </div>
                <div>
                  <div className="text-[#9C5A59] text-2xl mb-2">🛡️</div>
                  <p className="text-sm font-semibold text-[#5B3A39]">
                    Compra Segura
                  </p>
                  <p className="text-xs text-[#8C6E6D]">Proteção total</p>
                </div>
                <div>
                  <div className="text-[#9C5A59] text-2xl mb-2">🔄</div>
                  <p className="text-sm font-semibold text-[#5B3A39]">
                    Troca Fácil
                  </p>
                  <p className="text-xs text-[#8C6E6D]">Até 15 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MabelleFooter />
    </div>
  );
}
