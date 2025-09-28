import Header from "./pages/Header";
import Hero from "./pages/Hero";
import ModalAviso from "./pages/ModalAviso";
import ProductCard from "./pages/ProductCard";
import { useState, useEffect } from "react";

function App() {
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [progresso, setProgresso] = useState(0);
  const [produtos, setProdutos] = useState([]);

  function mostrarAviso(mensagem) {
    setModalAberto(true);
    setMensagem(mensagem);
    setProgresso(0);

    let progressoAtual = 0;
    const intervalo = setInterval(() => {
      progressoAtual += 1;
      setProgresso(progressoAtual);

      if (progressoAtual >= 110) {
        clearInterval(intervalo);
        setModalAberto(false);
      }
    }, 30);
  }

  async function verificarAPI() {
    try {
      const res = await fetch(
        "https://apianalua.onrender.com/catalog-products"
      );

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
      }

      const dados = await res.json();

      setProdutos(dados); // salva no estado
    } catch (err) {
      mostrarAviso(`❌ Falha ao conectar com a API: ${err.message}`);
    }
  }

  useEffect(() => {
    verificarAPI();
    const interval = setInterval(verificarAPI, 300000);
    return () => clearInterval(interval);
  }, );

  return (
    <div className="min-h-screen bg-[#F5FFFF]">
      <ModalAviso
        mensagem={mensagem}
        isOpen={modalAberto}
        progresso={progresso}
      />
      <Header />
      <Hero />
      <div className="px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {produtos.map((produto) => (
          <ProductCard
            key={produto.id}
            title={produto.title}
            description={produto.description}
            price={produto.price}
            image={produto.imagem}
            stock={produto.quantity}
            produtoId={produto.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
