import React, { useState, useCallback, useEffect } from 'react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, initialDate }) => {
  const [name, setName] = useState('');
  const [venue, setVenue] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [fee, setFee] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDate(initialDate || '');
    }
  }, [isOpen, initialDate]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '554298400498';
    const message = `Olá Nill Reis, tenho uma proposta de show!
    
*Nome do Contratante:* ${name}
*Nome do Local:* ${venue}
*Endereço:* ${address}
*Data Sugerida:* ${date}
*Cachê Oferecido:* ${fee}
    
Aguardo seu contato!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  }, [name, venue, address, date, fee, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 rounded-2xl shadow-2xl shadow-red-900/30 w-full max-w-md p-6 sm:p-8 text-white relative transform transition-all duration-300 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white text-3xl font-light transition-colors">&times;</button>
        
        <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-red-600 via-amber-400 to-green-500 bg-clip-text text-transparent animate-gradient-text">
          Agendar Show
        </h2>
        
        <p className="text-center text-neutral-400 mb-6 text-sm sm:text-base">Preencha os dados abaixo para enviar uma proposta.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition" />
          <input type="text" placeholder="Nome do local/evento" value={venue} onChange={(e) => setVenue(e.target.value)} required className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition" />
          <input type="text" placeholder="Endereço completo" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition" />
          <input type="text" placeholder="Data do evento" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition" />
          <input type="text" placeholder="Cachê oferecido" value={fee} onChange={(e) => setFee(e.target.value)} required className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition" />
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold py-3 px-4 rounded-lg hover:from-red-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-amber-400"
          >
            Enviar Proposta via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
