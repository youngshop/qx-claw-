import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatArea } from './components/ChatArea';
import { RightPanel } from './components/RightPanel';
import { Onboarding } from './components/Onboarding';
import { ViewType, NAV_ITEMS } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('chat');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  // Check if onboarding was already completed in this session
  useEffect(() => {
    const completed = localStorage.getItem('qx_claw_onboarding_complete');
    if (completed === 'true') {
      setIsOnboardingComplete(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
    localStorage.setItem('qx_claw_onboarding_complete', 'true');
  };

  const activeItem = NAV_ITEMS.find(item => item.id === activeView);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-gray-900">
      <AnimatePresence>
        {!isOnboardingComplete && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <Header 
          title={activeItem?.label || '聊天'} 
          onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
          isRightPanelOpen={isRightPanelOpen}
        />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Center Chat Area */}
          <ChatArea />

          {/* Right Info Panel */}
          <AnimatePresence mode="wait">
            {isRightPanelOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <RightPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
