import Header from "./pages/Header";
import Hero from "./pages/Hero";
import ModalAviso from "./pages/ModalAviso";
import ProductCard from "./pages/ProductCard";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

function App() {
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [progresso, setProgresso] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    try {
      const res = await fetch(
        "https://apianalua.onrender.com/catalog-products"
      );

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status} ${res.statusText}`);
      }

      const dados = await res.json();

      setProdutos(dados);
    } catch (err) {
      mostrarAviso(`❌ Falha ao conectar com a API: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verificarAPI();
    const interval = setInterval(verificarAPI, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5FFFF]">
      <ModalAviso
        mensagem={mensagem}
        isOpen={modalAberto}
        progresso={progresso}
      />
      <Header />
      <Hero />
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <Loader2 className="w-12 h-12 text-[#3CCAC8] animate-spin mb-4" />
          <p className="text-gray-600 text-lg font-medium">Carregando produtos...</p>
          <p className="text-gray-400 text-sm mt-2">Aguarde enquanto buscamos os melhores produtos para você</p>
        </div>
      ) : produtos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-8xl mb-4"><i class="fa-solid fa-box-open text-[#3fb9b7]"></i></div>
          <p className="text-gray-600 text-lg font-medium">Nenhum produto encontrado</p>
          <p className="text-gray-400 text-sm mt-2">Tente novamente mais tarde</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default App;