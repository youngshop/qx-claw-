import React from 'react';
import { NAV_ITEMS, ViewType } from '../types';
import { cn } from '../utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ activeView, onViewChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const categories = Array.from(new Set(NAV_ITEMS.map(item => item.category)));

  return (
    <aside className={cn(
      "bg-[#F9FAFB] border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out relative",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn("p-4 flex items-center justify-between mb-4", isCollapsed && "justify-center")}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 bg-[#E11D48] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">QX</span>
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-900 leading-none">QX-Claw</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Gateway</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-[#E11D48] rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">QX</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 space-y-6 overflow-y-auto overflow-x-hidden">
        {categories.map(category => (
          <div key={category} className="space-y-1">
            {category && !isCollapsed && (
              <h3 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 truncate">
                {category}
              </h3>
            )}
            {NAV_ITEMS.filter(item => item.category === category).map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all",
                  activeView === item.id
                    ? "bg-[#FCE7F3] text-[#E11D48]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", activeView === item.id ? "text-[#E11D48]" : "text-gray-400")} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 flex flex-col gap-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
            <span>健康状况 正常</span>
          </div>
        )}
        
        <button 
          onClick={onToggleCollapse}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          {!isCollapsed && <span>收起菜单</span>}
        </button>
      </div>
    </aside>
  );
}
