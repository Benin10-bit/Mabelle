import React from 'react';
import { Facebook, Instagram, MapPin, Mail, Phone, Clock, Heart } from 'lucide-react';

export default function MabelleFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#713F3E] to-[#553332] text-[#F7EAEA]">
      {/* Seção Principal */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sobre Mabelle - Destaque Central */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="inline-block">
              <h3 className="text-4xl font-bold text-[#EBD2D2] mb-2">Mabelle</h3>
              <div className="h-1 w-full bg-gradient-to-r from-[#9C5A59] via-[#C28C8A] to-[#9C5A59] rounded-full mb-4"></div>
            </div>
            <p className="text-[#C28C8A] italic text-xl mb-6 flex items-center justify-center lg:justify-start gap-2">
              <Heart size={20} fill="#C28C8A" />
              Costurando Riqueza
            </p>
            <p className="text-base leading-relaxed opacity-90 max-w-md mx-auto lg:mx-0">
              Cada peça conta uma história. Transformamos tecidos em arte com dedicação, amor e a tradição da costura artesanal que atravessa gerações.
            </p>
          </div>

          {/* Contato */}
          <div className="bg-[#713F3E] bg-opacity-40 rounded-2xl p-8 backdrop-blur-sm border border-[#9C5A59] border-opacity-30">
            <h4 className="text-2xl font-semibold text-[#EBD2D2] mb-6 flex items-center gap-2">
              <Mail className="text-[#C28C8A]" size={24} />
              Entre em Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={20} className="text-[#C28C8A] mt-1 flex-shrink-0 group-hover:text-[#B87776] transition-colors" />
                <span className="text-sm opacity-90 leading-relaxed">
                  Rua das Costuras, 123<br />
                  Centro - Caicó/RN<br />
                  CEP: 59300-000
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={20} className="text-[#C28C8A] flex-shrink-0 group-hover:text-[#B87776] transition-colors" />
                <a href="tel:+558494833000" className="text-sm opacity-90 hover:text-[#B87776] transition-colors">
                  (84) 99483-3000
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={20} className="text-[#C28C8A] flex-shrink-0 group-hover:text-[#B87776] transition-colors" />
                <a href="mailto:contato@mabelle.com.br" className="text-sm opacity-90 hover:text-[#B87776] transition-colors">
                  contato@mabelle.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Horário e Redes */}
          <div className="bg-[#713F3E] bg-opacity-40 rounded-2xl p-8 backdrop-blur-sm border border-[#9C5A59] border-opacity-30">
            <h4 className="text-2xl font-semibold text-[#EBD2D2] mb-6 flex items-center gap-2">
              <Clock className="text-[#C28C8A]" size={24} />
              Horário
            </h4>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-90">Segunda - Sexta</span>
                <span className="text-[#C28C8A] font-semibold">8h às 18h</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-90">Sábado</span>
                <span className="text-[#C28C8A] font-semibold">8h às 13h</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-90">Domingo</span>
                <span className="text-[#9C5A59] font-semibold">Fechado</span>
              </div>
            </div>
            
            <div className="border-t border-[#9C5A59] border-opacity-30 pt-6">
              <h4 className="text-lg font-semibold text-[#EBD2D2] mb-4">Siga-nos</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gradient-to-br from-[#9C5A59] to-[#713F3E] rounded-xl flex items-center justify-center hover:from-[#B87776] hover:to-[#9C5A59] transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook size={22} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gradient-to-br from-[#9C5A59] to-[#713F3E] rounded-xl flex items-center justify-center hover:from-[#B87776] hover:to-[#9C5A59] transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior com padrão decorativo */}
      <div className="border-t border-[#9C5A59] border-opacity-30 bg-[#5B3A39]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p className="flex items-center gap-2">
              © 2025 Mabelle Costura Criativa 
              <span className="hidden md:inline">•</span> 
              <span className="text-[#C28C8A]">Feito com amor e dedicação</span>
            </p>
            <div className="flex gap-6">
              <a href="#privacidade" className="hover:text-[#B87776] transition-colors">
                Privacidade
              </a>
              <span className="text-[#9C5A59]">•</span>
              <a href="#termos" className="hover:text-[#B87776] transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}