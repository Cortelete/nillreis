
import React, { useState, useEffect } from 'react';

const quotes = [
    "O Senhor é o meu pastor; de nada terei falta. - Salmos 23:1",
    "Tudo posso naquele que me fortalece. - Filipenses 4:13",
    "O coração alegre aformoseia o rosto. - Provérbios 15:13",
    "Deleita-te também no Senhor, e te concederá os desejos do teu coração. - Salmos 37:4",
    "O temor do Senhor é o princípio da sabedoria. - Provérbios 9:10",
    "Porque para Deus nada é impossível. - Lucas 1:37",
    "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho. - Salmos 119:105",
    "O Senhor é a minha luz e a minha salvação; a quem temerei? - Salmos 27:1",
    "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. - Provérbios 3:5",
    "Esforçai-vos, e ele fortalecerá o vosso coração, vós todos que esperais no Senhor. - Salmos 31:24",
    "O choro pode durar uma noite, mas a alegria vem pela manhã. - Salmos 30:5",
    "Mil poderão cair ao teu lado; dez mil, à tua direita, mas nada te atingirá. - Salmos 91:7",
    "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios. - Salmos 90:12",
    "Pois a sabedoria é mais proveitosa do que a prata e rende mais do que o ouro. - Provérbios 3:14",
    "Porque a palavra de Deus é viva e eficaz. - Hebreus 4:12",
    "O amor é paciente, o amor é bondoso. - 1 Coríntios 13:4",
    "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós. - 1 Pedro 5:7",
    "O amigo ama em todos os momentos; é um irmão na adversidade. - Provérbios 17:17",
    "Deus é o nosso refúgio e a nossa fortaleza, auxílio sempre presente na adversidade. - Salmos 46:1",
    "Combati o bom combate, terminei a corrida, guardei a fé. - 2 Timóteo 4:7"
];


const Profile: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <img
        src="/logo.png"
        alt="Logo Nill Reis"
        className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full object-cover shadow-lg border-4 border-white/50"
      />
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 via-amber-400 to-green-500 bg-clip-text text-transparent animate-gradient-text">
        Nill Reis Cantor
      </h1>
      <div className="mt-3 h-12 flex items-center justify-center">
         <p key={quoteIndex} className="text-sm sm:text-base text-neutral-300 italic animate-fade-in">
             "{quotes[quoteIndex]}"
         </p>
      </div>
    </>
  );
};

export default Profile;
