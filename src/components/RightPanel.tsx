import React from 'react';
import { Info, AlertCircle, HelpCircle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function RightPanel() {
  return (
    <div className="w-80 border-l border-gray-200 bg-white h-full overflow-y-auto flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#E11D48]" />
          系统提示信息
        </h3>
      </div>

      <div className="p-6 space-y-8">
        <section>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            如何使用
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                在下方输入框中输入你的问题或指令，按回车键发送。
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                使用左侧工具栏切换不同的功能模块，如代理管理、技能配置等。
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5" />
            注意事项
          </h4>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-xs text-amber-800 leading-relaxed">
              请勿在对话中输入敏感个人信息或公司机密。AI 生成的内容仅供参考，请注意核实。
            </p>
          </div>
        </section>

        <section>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            提示信息
          </h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg group cursor-pointer hover:bg-gray-100 transition-colors">
              <p className="text-xs font-medium text-gray-700 mb-1">多轮对话支持</p>
              <p className="text-[11px] text-gray-500">系统会自动保存当前会话上下文，支持连续追问。</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg group cursor-pointer hover:bg-gray-100 transition-colors">
              <p className="text-xs font-medium text-gray-700 mb-1">快捷键说明</p>
              <p className="text-[11px] text-gray-500">Shift + Enter 换行，Enter 直接发送。</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50/50">
        <p className="text-[10px] text-gray-400 text-center">
          版本 2026.3.2 | © 2026 OpenClaw
        </p>
      </div>
    </div>
  );
}
