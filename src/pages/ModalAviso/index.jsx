import React, { useEffect, useState } from "react";

export default function ModalAviso({ isOpen, mensagem, progresso }) {
  // "mounted" controla se o componente deve estar no DOM
  const [mounted, setMounted] = useState(isOpen);
  // "visible" controla as classes CSS (translate/opacity)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      // montar imediatamente e, no próximo tick, ativar a classe de "visible"
      setMounted(true);
      timer = setTimeout(() => setVisible(true), 10); // pequena espera para disparar a transição
    } else {
      // iniciar animação de saída
      setVisible(false);
      // desmontar depois da duração da transição (300ms aqui)
      timer = setTimeout(() => setMounted(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    // wrapper fixado no topo-direito; pointer-events-none evita bloquear cliques indesejados
    <div className="fixed top-4 right-1 z-[500] text-[#3CCAC8] pointer-events-none">
      <div
        // inner permite pointer-events (para clicar dentro do modal)
        className={`pointer-events-auto bg-white border border-slate-100 rounded-2xl shadow-md shadow-slate-400 p-4 max-w-sm min-w-[18vw] transform transition-all duration-300 ease-out
          ${
            visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
      >
        <h2 className="text-lg font-semibold mb-2">Aviso</h2>
        <p className="mb-3 whitespace-pre-line">{mensagem}</p>

        {/* barra de progresso */}
        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-[#3CCAC8] transition-all duration-150"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>
    </div>
  );
}
