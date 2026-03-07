import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, ChevronRight, Loader2, MessageSquare, Bot, Globe } from 'lucide-react';
import { cn } from '../utils';

interface OnboardingProps {
  onComplete: () => void;
}

type Step = 'start' | 'llm' | 'channels' | 'generating' | 'success';

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<Step>('start');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 'generating') {
      const duration = 20000; // 20 seconds
      const interval = 100;
      const stepSize = (interval / duration) * 100;
      
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep('success');
            return 100;
          }
          return prev + stepSize;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [step]);

  const renderStart = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center text-center space-y-8"
    >
      <div className="relative">
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -2, 2, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-9xl filter drop-shadow-2xl"
        >
          🦞
        </motion.div>
        <motion.div 
          animate={{ 
            y: [-10, -30],
            x: [10, 30],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          className="absolute -top-4 -right-4 text-2xl font-bold text-gray-400"
        >
          Z
        </motion.div>
        <motion.div 
          animate={{ 
            y: [-10, -40],
            x: [20, 50],
            opacity: [0, 1, 0],
            scale: [0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          className="absolute -top-10 -right-10 text-xl font-bold text-gray-300"
        >
          z
        </motion.div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">发现一只沉睡的 QX-Claw</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          这只强大的网关代理正在休眠中。领养它，开启你的智能自动化之旅。
        </p>
      </div>

      <button 
        onClick={() => setStep('llm')}
        className="group relative px-12 py-4 bg-[#E11D48] text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-200 hover:bg-[#BE123C] hover:scale-105 transition-all flex items-center gap-3"
      >
        领养它
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );

  const renderLLM = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl w-full space-y-8"
    >
      <div className="space-y-2">
        <div className="w-12 h-12 bg-red-50 text-[#E11D48] rounded-xl flex items-center justify-center mb-4">
          <Bot className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">第一步：配置 LLM</h2>
        <p className="text-gray-500">
          为你的 QX-Claw 选择一个大脑。你可以连接自己的 API Key，或者直接使用系统内置的免费模型。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 border-2 border-[#E11D48] bg-red-50 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              ✨
            </div>
            <div>
              <p className="font-bold text-gray-900">系统内置 LLM</p>
              <p className="text-xs text-gray-500">推荐初学者使用，无需配置</p>
            </div>
          </div>
          <Check className="w-5 h-5 text-[#E11D48]" />
        </div>
        
        <div className="p-4 border border-gray-200 rounded-2xl flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              🔑
            </div>
            <div>
              <p className="font-bold text-gray-900">自定义 API Key</p>
              <p className="text-xs text-gray-500">支持 OpenAI, Anthropic, Gemini 等</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button onClick={() => setStep('start')} className="text-sm font-medium text-gray-400 hover:text-gray-600">返回</button>
        <button 
          onClick={() => setStep('channels')}
          className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
        >
          下一步
        </button>
      </div>
    </motion.div>
  );

  const renderChannels = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl w-full space-y-8"
    >
      <div className="space-y-2">
        <div className="w-12 h-12 bg-red-50 text-[#E11D48] rounded-xl flex items-center justify-center mb-4">
          <Globe className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">第二步：配置会话工具</h2>
        <p className="text-gray-500">
          让你的 QX-Claw 能够触达世界。你可以现在连接社交平台，也可以稍后在设置中配置。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {['Telegram', '飞书', 'WhatsApp', 'Slack', 'Discord', 'WeChat'].map(name => (
          <div key={name} className="p-4 border border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:border-[#E11D48] hover:bg-red-50 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
              <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-[#E11D48]" />
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-[#E11D48]">{name}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button onClick={() => setStep('llm')} className="text-sm font-medium text-gray-400 hover:text-gray-600">返回</button>
        <div className="flex gap-3">
          <button 
            onClick={() => setStep('generating')}
            className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
          >
            跳过并生成
          </button>
          <button 
            onClick={() => setStep('generating')}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
          >
            完成配置
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderGenerating = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center space-y-8 w-full max-w-md"
    >
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-8xl"
      >
        🦞
      </motion.div>
      
      <div className="space-y-4 w-full">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">正在唤醒 QX-Claw...</h2>
          <p className="text-sm text-gray-500">正在注入灵魂，配置神经网络与通信链路</p>
        </div>
        
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#E11D48]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs font-mono text-gray-400">{Math.round(progress)}% COMPLETE</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>预计还需要 {Math.ceil(20 * (1 - progress/100))} 秒</span>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center space-y-8"
    >
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
        <Check className="w-12 h-12" strokeWidth={3} />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">QX-Claw 已就绪！</h2>
        <p className="text-gray-500">你的智能代理已成功领养并完成初始化。</p>
      </div>

      <button 
        onClick={onComplete}
        className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black hover:scale-105 transition-all"
      >
        进入控制台
      </button>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 'start' && renderStart()}
        {step === 'llm' && renderLLM()}
        {step === 'channels' && renderChannels()}
        {step === 'generating' && renderGenerating()}
        {step === 'success' && renderSuccess()}
      </AnimatePresence>
    </div>
  );
}
