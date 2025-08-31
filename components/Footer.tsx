import React from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

const Footer: React.FC = () => {
    const devWhatsApp = "5541988710303";
    const clientName = "Nill Reis Cantor";
    const message = `Olá, vi o link de ${clientName} e quero um site igual!`;
    const whatsappUrl = `https://wa.me/${devWhatsApp}?text=${encodeURIComponent(message)}`;

    return (
        <footer className="w-full max-w-md mx-auto text-center mt-8 space-y-4 px-4">
             <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-xl shadow-lg bg-gradient-to-r from-green-800 via-green-700 to-teal-800 animate-gradient-bg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/20"
            >
                <div className="w-4 h-4 sm:w-5 sm:h-5"><WhatsAppIcon /></div>
                Quer um site incrível como esse? Fale comigo! 🚀
            </a>
            <div className="text-xs text-gray-400">
                Desenvolvido por{' '}
                <a 
                    href="https://www.instagram.com/inteligenciarte.ia/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-white transition"
                >
                    InteligenciArte.IA ✨
                </a>
            </div>
        </footer>
    );
};

export default Footer;