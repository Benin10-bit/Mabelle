import { useState, useEffect } from "react";
import CartModal from "../ModalCart";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

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

  function openCart(){
    setIsOpen(true)
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
        {/* Desktop layout */}{" "}
        <div className="hidden sm:flex w-full justify-between items-center">
          {/* Logo à esquerda */} <h1 className="text-5xl glow-cyan">AnaLua</h1>
          {/* Ícone carrinho à direita */}
          <button onClick={openCart}>
            <i className="fa-solid fa-cart-shopping cursor-pointer hover:opacity-60 transition-all duration-300 ease glow-cyan text-3xl"></i>
          </button>
        </div>
        {/* Mobile layout */}
        <div className="flex sm:hidden w-full justify-between items-center">
          {/* Botão hamburguer à esquerda */}
          <button
            className="text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars hover:opacity-60 duration-300 ease-in-out cursor-pointer"></i>
          </button>

          {/* Ícone carrinho à direita */}
          <button onClick={openCart}>
            <i className="fa-solid fa-cart-shopping cursor-pointer transition-all duration-300 ease hover:opacity-60 glow-cyan text-2xl"></i>
          </button>
        </div>
        {/* Menu mobile com transição */}
        <nav
          className={`sm:hidden w-full overflow-hidden transition-[max-height] ${
            menuOpen ? "max-h-60" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col gap-3 text-xl mt-2 bg-[#3CCAC8] rounded-lg py-2 items-center">
            <li className="hover:opacity-60 transition-all duration-300 ease glow-cyan cursor-pointer">
              Eu
            </li>
            <li className="hover:opacity-60 transition-all duration-300 ease glow-cyan cursor-pointer">
              Amo
            </li>
            <li className="hover:opacity-60 transition-all duration-300 ease glow-cyan cursor-pointer">
              Kalyne
            </li>
          </ul>
        </nav>
      </header>
      <CartModal open={isOpen} onClose={() => setIsOpen(false)}/>
    </>
  );
}
