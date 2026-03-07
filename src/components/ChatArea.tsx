import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, CornerDownLeft } from 'lucide-react';
import { Message } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

export function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 QX-Claw 助手。今天有什么我可以帮你的吗？你可以问我关于系统配置、代理状态或者任务调度的任何问题。',
      timestamp: '10:41'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `收到你的消息: "${input}"。这是一个模拟回复。QX-Claw 正在处理你的请求，请稍候...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-6 items-start group"
              >
                <div className={cn(
                  "w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-lg shadow-sm border",
                  msg.role === 'user' ? 'bg-white border-gray-200' : 'bg-[#E11D48] border-[#E11D48] text-white'
                )}>
                  {msg.role === 'user' ? '👤' : '🦞'}
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">
                      {msg.role === 'assistant' ? 'QX-Claw' : 'You'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="text-[15px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-20" />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-8 px-6">
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-[#F3F4F6] border border-transparent rounded-2xl shadow-sm focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-md transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask QX-Claw anything..."
              className="w-full p-4 pr-14 text-[15px] bg-transparent border-none focus:ring-0 resize-none min-h-[56px] max-h-[200px]"
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <div className="absolute right-2 bottom-2">
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 bg-[#E11D48] hover:bg-[#BE123C] disabled:bg-gray-300 text-white rounded-xl transition-all shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 text-center mt-3">
            QX-Claw can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
