import React, { useEffect, useState } from "react";

export default function ModalAviso({ isOpen, mensagem, progresso }) {
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setMounted(true);
      timer = setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      timer = setTimeout(() => setMounted(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-1 z-[500] pointer-events-none">
      <div
        className={`pointer-events-auto bg-[#F7EAEA] border border-[#EBD2D2] rounded-2xl shadow-md shadow-[#9C5A59]/20 p-4 max-w-sm min-w-[18vw] transform transition-all duration-300 ease-out
          ${
            visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
      >
        <h2 className="text-lg font-semibold mb-2 text-[#713F3E]">Aviso</h2>
        <p className="mb-3 whitespace-pre-line text-[#5B3A39]">{mensagem}</p>

        {/* barra de progresso */}
        <div className="w-full h-2 bg-[#EBD2D2] rounded overflow-hidden">
          <div
            className="h-full bg-[#9C5A59] transition-all duration-150"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>
    </div>
  );
}
