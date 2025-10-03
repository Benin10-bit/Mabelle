import { useState, useEffect } from "react";
import CartModal from "../ModalCart";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) setShow(false);
      else if (currentScroll < lastScroll) setShow(true);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  function openCart() {
    setIsOpen(true);
  }

  return (
    <>
      <header
        className={`fixed flex flex-col sm:flex-row justify-between items-center
                  px-6 sm:px-28 py-4 w-screen text-white
                  bg-[#3CCAC8] shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-b-3xl
                  transition-transform duration-300 z-40 ${
                    show ? "translate-y-0" : "-translate-y-full"
                  }`}
      >
        {/* Desktop layout */}
        <div className="hidden sm:flex w-full justify-between items-center">
          {/* Logo à esquerda */}
          <a href="https://painelanalua.netlify.app/" className="text-5xl hover:opacity-60 glow-cyan transition-all duration-300 ease">AnaLua</a>
          {/* Ícone carrinho à direita */}
          <button onClick={openCart}>
            <i className="fa-solid fa-cart-shopping cursor-pointer hover:opacity-60 transition-all duration-300 ease glow-cyan text-3xl"></i>
          </button>
        </div>

        {/* Mobile layout */}
        <div className="flex sm:hidden w-full justify-between items-center">
          {/* Diamante à esquerda */}
          <a
            href="https://painelanalua.netlify.app/"
            className="fa-regular fa-gem text-2xl hover:opacity-60 transition-all duration-300 ease glow-cyan"
          ></a>

          {/* Ícone carrinho à direita */}
          <button onClick={openCart}>
            <i className="fa-solid fa-cart-shopping cursor-pointer transition-all duration-300 ease hover:opacity-60 glow-cyan text-2xl"></i>
          </button>
        </div>
      </header>

      <CartModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
