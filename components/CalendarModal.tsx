import React, { useState, useEffect } from 'react';

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
  const [selectedEvent, setSelectedEvent] = useState<{ date: string; event: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed to ensure clean state on reopen
      setSelectedEvent(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const monthName = "Outubro";
  const year = 2025;
  const monthIndex = 9; // October is month 9 (0-indexed)
  const daysInMonth = 31;
  const startDay = 3; // 1 de Out de 2025 é uma Quarta-feira (0=Dom, ..., 3=Qua, ...)

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize for accurate comparison

  const renderDays = () => {
    const days = [];
    // Add empty cells for days before the 1st
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-1"></div>);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const event = events[day];
      const dateStr = `${day.toString().padStart(2, '0')}/${(monthIndex + 1).toString().padStart(2, '0')}/${year}`;
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
          <button
            key={day}
            onClick={() => setSelectedEvent({ date: dateStr, event })}
            aria-label={`Ver detalhes do evento em ${dateStr}`}
            className="text-center p-1 sm:p-2 border border-neutral-700/50 rounded-lg bg-red-900/40 hover:bg-red-800/60 hover:border-amber-400 transition-all duration-200 flex flex-col justify-center items-center h-24 sm:h-28 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <span className="font-bold text-lg sm:text-xl text-amber-300">{day}</span>
          </button>
        );
      } else {
        days.push(
          <button
            key={day}
            onClick={() => onDateSelect(dateStr)}
            aria-label={`Agendar show para ${dateStr}`}
            className="text-center p-1 sm:p-2 border border-neutral-700 rounded-lg bg-neutral-800 hover:bg-green-700/50 hover:border-green-500 transition-all duration-200 flex flex-col items-center justify-center sm:justify-start h-24 sm:h-28 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="font-bold text-base sm:text-lg text-green-400">{day}</span>
            <span className="text-xs text-green-400 mt-1 hidden sm:block">Disponível</span>
          </button>
        );
      }
    }
    return days;
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-title"
      >
        <div 
          className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-700 rounded-2xl shadow-2xl shadow-red-900/30 w-full max-w-lg p-6 sm:p-8 text-white relative transform transition-all duration-300 animate-fade-in-up max-h-[90vh] overflow-y-auto"
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
          
          <div className="flex justify-center items-center flex-wrap gap-4 mt-6 text-xs sm:text-sm text-neutral-400">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-900/40 border border-neutral-700/50"></div>
                <span className="text-amber-300">Reservado</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700"></div>
                <span className="text-green-400">Disponível</span>
             </div>
          </div>

          <p className="text-center text-neutral-500 mt-4 text-xs sm:text-sm">Clique em um dia <span className="text-green-400 font-semibold">disponível</span> para agendar ou em um dia <span className="text-amber-300 font-semibold">reservado</span> para ver detalhes.</p>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-[60] p-4" 
          onClick={() => setSelectedEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-details-title"
        >
          <div 
            className="bg-neutral-900/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-900/30 w-full max-w-xs sm:max-w-sm p-6 sm:p-8 text-white relative transform transition-all duration-300 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedEvent(null)} aria-label="Fechar detalhes do evento" className="absolute top-4 right-4 text-neutral-400 hover:text-white text-3xl font-light transition-colors">&times;</button>
            <h3 id="event-details-title" className="text-2xl font-bold text-center text-amber-300">
              Show Confirmado
            </h3>
            <div className="mt-6 text-center space-y-2">
                <p className="text-neutral-400 text-sm">Data:</p>
                <p className="text-lg font-semibold">{selectedEvent.date}</p>
                <p className="text-neutral-400 text-sm pt-2">Local:</p>
                <p className="text-lg font-semibold text-amber-200 leading-tight">{selectedEvent.event}</p>
            </div>
             <button 
                onClick={() => setSelectedEvent(null)}
                className="mt-8 w-full bg-amber-600/80 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-500/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-amber-400"
            >
                Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarModal;