import React, { useState } from 'react';
import { Maximize2, RotateCw, Lightbulb, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../utils';

interface HeaderProps {
  title: string;
  onToggleRightPanel: () => void;
  isRightPanelOpen: boolean;
}

export function Header({ title, onToggleRightPanel, isRightPanelOpen }: HeaderProps) {
  return (
    <header className="h-14 border-b border-gray-100 bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <div className="h-4 w-[1px] bg-gray-200 mx-1" />
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Main Session</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
          <RotateCw className="w-4 h-4" />
        </button>
        
        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
          <Lightbulb className="w-4 h-4" />
        </button>

        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
          <Maximize2 className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-gray-200 mx-1" />

        <button 
          onClick={onToggleRightPanel}
          className={cn(
            "p-1.5 rounded-lg transition-all",
            isRightPanelOpen 
              ? "bg-[#E11D48]/10 text-[#E11D48]" 
              : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
          )}
        >
          {isRightPanelOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
