import React, { useEffect, useState } from "react";
import { X, ShoppingBag, Trash2 } from "lucide-react";

function CartModal({ open, onClose }) {
  const [cartItems, setCartItems] = useState([]);

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("carrinho", JSON.stringify(updated.map((i) => i.id)));
  };

  async function loadCartFromLocalStorage() {
    try {
      const raw = localStorage.getItem("carrinho");
      if (!raw) return;

      const savedIds = JSON.parse(raw);
      if (!Array.isArray(savedIds) || savedIds.length === 0) return;

      const responses = await Promise.all(
        savedIds.map(async (id) => {
          try {
            const res = await fetch(`https://apianalua.onrender.com/search/${id}`);
            if (!res.ok) {
              console.error(`Erro na resposta do produto ${id}:`, res.status);
              return null;
            }

            const data = await res.json();
            const product = Array.isArray(data) && data.length > 0 ? data[0] : data;
            if (!product || typeof product !== "object" || product.error || !product.id)
              return null;

            const priceNumber = Number(product.price);
            const quantityNumber = Number(product.quantity);

            return {
              ...product,
              price: isNaN(priceNumber) ? 0 : priceNumber,
              quantity: isNaN(quantityNumber) ? 1 : quantityNumber,
            };
          } catch (err) {
            console.error(`Erro ao buscar produto ${id}:`, err);
            return null;
          }
        })
      );

      const validProducts = responses.filter((item) => item !== null);
      setCartItems(validProducts || []);
    } catch (error) {
      console.error("Erro ao carregar produtos do carrinho:", error);
      setCartItems([]);
    }
  }

  useEffect(() => {
    loadCartFromLocalStorage();
    function handleStorageChange() {
      loadCartFromLocalStorage();
    }
    window.addEventListener("storageChange", handleStorageChange);
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  function sendToWhatsApp() {
    if (!cartItems || cartItems.length === 0) return;

    const message = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.title} - R$ ${item.price.toFixed(2).replace(".", ",")}`
      )
      .join("\n");

    const total = cartItems
      .reduce((sum, item) => sum + item.price, 0)
      .toFixed(2)
      .replace(".", ",");

    const fullMessage = `Olá! Gostaria de comprar os seguintes produtos:\n${message}\n\nTotal: R$ ${total}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const waLink = `https://wa.me/558494833000?text=${encodedMessage}`;
    window.open(waLink, "_blank");
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#5B3A39]/70 opacity-50 z-40 transition-opacity duration-300 ${
          open ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-[#F7EAEA] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#9C5A59] to-[#B87776] p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Seu Carrinho</h2>
              <p className="text-white/90 text-sm mt-1">
                {cartItems.length} {cartItems.length === 1 ? "item" : "itens"}{" "}
                selecionado{cartItems.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full z-50 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="absolute top-0 right-0 opacity-10">
            <div className="w-32 h-32 rounded-full border-4 border-white transform translate-x-16 -translate-y-8"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 px-6">
              <ShoppingBag
                size={64}
                className="text-[#C28C8A] mb-4 opacity-60"
              />
              <h3 className="text-[#713F3E] text-lg font-semibold mb-2">
                Carrinho vazio
              </h3>
              <p className="text-[#9C5A59] text-center">
                Adicione algumas peças criativas para começar
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#EBD2D2] rounded-2xl p-4 shadow-sm border border-[#E9D9D9] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.imagem}
                        alt={item.title || "Produto"}
                        className="w-20 h-20 rounded-xl object-cover bg-[#E9D9D9]"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-[#713F3E] text-sm leading-tight">
                          {item.title || "Produto"}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#9C5A59] hover:text-[#D97A7A] p-1 ml-2 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#5B3A39]">
                            R$ {(item.price ?? 0).toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#E9D9D9] bg-[#F7EAEA] p-6">
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-[#713F3E]">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="border-t border-[#EBD2D2] pt-2">
                <div className="flex justify-between text-[#5B3A39] font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </div>

            <button
              onClick={sendToWhatsApp}
              className="w-full bg-gradient-to-r from-[#9C5A59] to-[#B87776] hover:from-[#B87776] hover:to-[#9C5A59] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[0.98] cursor-pointer hover:shadow-lg"
            >
              Finalizar Compra
            </button>

            <p className="text-center text-xs text-[#9C5A59] mt-3">
              Compra finalizada no WhatsApp • Entrega garantida
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CartModal;
