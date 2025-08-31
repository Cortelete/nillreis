
import React from 'react';

interface FloatingNoteProps {
    note?: string;
    className?: string;
}

const FloatingNote: React.FC<FloatingNoteProps> = ({ note = '♪', className = '' }) => {
    return (
        <div className={`absolute select-none pointer-events-none text-neutral-400 animate-pulse ${className}`}>
            {note}
        </div>
    );
};

export default FloatingNote;
