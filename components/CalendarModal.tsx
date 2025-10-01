import React from 'react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

const events: { [key: number]: string } = {
  // Quintas-feiras
  2: 'Mancha Eventos',
  9: 'Mancha Eventos',
  16: 'Mancha Eventos',
  23: 'Mancha Eventos',
  30: 'Mancha Eventos',
  // Sábados
  4: 'Boteco do Paulão',
  11: 'Boteco do Paulão',
  18: 'Boteco do Paulão',
  25: 'Boteco do Paulão',
  // Datas específicas
  10: 'Lanchonete Blitz',
  17: 'Motos Bar',
  19: 'Colônia Sutil',
  24: 'Mancha Evento',
  26: 'Pesqueiro Águas Claras',
  31: 'Motos Bar',
};

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, onDateSelect }) => {
  if (!isOpen) return null;

  const monthName = "Outubro";
  const year = 2025;
  const monthIndex = 9; // October is month 9 (0-indexed)
  const daysInMonth = 31;
  const startDay = 3; // 1 de Out de 2025 é uma Quarta-feira (0=Dom, ..., 3=Qua, ...)

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day for accurate comparison

  const renderDays = () => {
    const days = [];
    // Add empty cells for days before the 1st
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-1"></div>);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const event = events[day];
      const dateStr = `${day}/${monthIndex + 1}/${year}`;
      const cellDate = new Date(year, monthIndex, day);

      if (cellDate < today) {
        days.push(
          <div key={day} className="text-center p-1 sm:p-2 border border-neutral-800 rounded-lg bg-neutral-900/50 cursor-not-allowed flex flex-col justify-start items-center h-24 sm:h-28 text-neutral-600">
            <span className="font-bold text-sm sm:text-base line-through">{day}</span>
            <span className="text-xs text-neutral-500 mt-1">Passou</span>
          </div>
        );
      } else if (event) {
        days.push(
          <div key={day} className="text-center p-1 sm:p-2 border border-neutral-700/50 rounded-lg bg-red-900/40 cursor-not-allowed flex flex-col justify-start items-center h-24 sm:h-28">
            <span className="font-bold text-sm sm:text-base">{day}</span>
            <span className="text-[10px] sm:text-xs text-amber-300 mt-1 leading-tight text-balance">{event}</span>
          </div>
        );
      } else {
        days.push(
          <button
            key={day}
            onClick={() => onDateSelect(dateStr)}
            aria-label={`Agendar show para ${dateStr}`}
            className="text-center p-1 sm:p-2 border border-neutral-700 rounded-lg bg-neutral-800 hover:bg-green-700/50 hover:border-green-500 transition-all duration-200 flex flex-col justify-start items-center h-24 sm:h-28 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="font-bold text-sm sm:text-base">{day}</span>
            <span className="text-xs text-green-400 mt-1">Disponível</span>
          </button>
        );
      }
    }
    return days;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-title"
    >
      <div 
        className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 rounded-2xl shadow-2xl shadow-red-900/30 w-full max-w-lg p-6 sm:p-8 text-white relative transform transition-all duration-300 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} aria-label="Fechar modal" className="absolute top-4 right-4 text-neutral-400 hover:text-white text-3xl font-light transition-colors">&times;</button>
        
        <h2 id="calendar-title" className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-red-600 via-amber-400 to-green-500 bg-clip-text text-transparent animate-gradient-text">
          Agenda de Shows
        </h2>
        <p className="text-center text-neutral-400 mb-6 text-sm sm:text-base">{monthName} / {year}</p>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center font-bold text-neutral-400 text-xs sm:text-sm p-2" aria-hidden="true">{day}</div>
          ))}
          {renderDays()}
        </div>
        <p className="text-center text-neutral-500 mt-6 text-xs sm:text-sm">Clique em um dia <span className="text-green-400 font-semibold">disponível</span> para agendar.</p>
      </div>
    </div>
  );
};

export default CalendarModal;
