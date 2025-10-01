
import React, { useState } from 'react';
import Profile from './components/Profile';
import LinkButton from './components/LinkButton';
import ScheduleModal from './components/ScheduleModal';
import Footer from './components/Footer';
import FloatingNote from './components/FloatingNote';
import { InstagramIcon } from './components/icons/InstagramIcon';
import { CalendarIcon } from './components/icons/CalendarIcon';
import CalendarModal from './components/CalendarModal';

const App: React.FC = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [initialDate, setInitialDate] = useState('');

  const links = [
    {
      href: 'https://www.instagram.com/nillreiscantor/',
      text: 'Instagram Pessoal',
      icon: <InstagramIcon />,
    },
    {
      href: 'https://www.instagram.com/amaraopet/',
      text: 'Instagram Amarão Pet',
      icon: <InstagramIcon />,
    },
  ];

  const handleOpenScheduleModal = (date = '') => {
    setInitialDate(date);
    setIsScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setInitialDate('');
  };
  
  const handleDateSelect = (date: string) => {
    setIsCalendarModalOpen(false);
    handleOpenScheduleModal(date);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-green-950 animate-gradient-bg"></div>

      {/* Floating Musical Notes */}
      <FloatingNote className="top-[10%] left-[5%] text-2xl opacity-20 text-red-500" />
      <FloatingNote note="♫" className="top-[20%] right-[10%] text-3xl opacity-10 text-green-500" />
      <FloatingNote note="♩" className="top-[50%] left-[15%] text-xl opacity-30 text-red-400" />
      <FloatingNote note="♬" className="top-[70%] right-[20%] text-4xl opacity-15 text-green-400" />
      <FloatingNote className="bottom-[5%] right-[5%] text-2xl opacity-25 text-amber-500" />
      <FloatingNote note="♫" className="bottom-[15%] left-[10%] text-3xl opacity-20 text-red-600" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="w-full max-w-md mx-auto bg-neutral-900/60 rounded-2xl shadow-2xl shadow-red-900/30 p-6 sm:p-8 text-center text-white backdrop-blur-md border border-neutral-700">
          <Profile />
          
          <div className="mt-8 flex flex-col space-y-4">
            {links.map((link, index) => (
              <LinkButton key={index} href={link.href} text={link.text} icon={link.icon} />
            ))}
             <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="group relative flex items-center justify-center w-full p-4 bg-neutral-900 text-white rounded-xl shadow-lg hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-500"
            >
              <div className="absolute left-4 w-6 h-6"><CalendarIcon /></div>
              <span className="font-semibold text-sm sm:text-base">Agenda de Shows</span>
            </button>
             <button
              onClick={() => handleOpenScheduleModal()}
              className="group relative flex items-center justify-center w-full p-4 bg-neutral-900 text-white rounded-xl shadow-lg hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 hover:bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500"
            >
              <div className="absolute left-4 w-6 h-6"><CalendarIcon /></div>
              <span className="font-semibold text-sm sm:text-base">Agendar Show</span>
            </button>
          </div>
        </div>
        
        <Footer />
      </main>

      <CalendarModal 
        isOpen={isCalendarModalOpen} 
        onClose={() => setIsCalendarModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
      <ScheduleModal 
        isOpen={isScheduleModalOpen} 
        onClose={handleCloseScheduleModal} 
        initialDate={initialDate}
      />
    </div>
  );
};

export default App;
