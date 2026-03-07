import { 
  Settings, 
  Radio, 
  BarChart3, 
  Clock, 
  Bot, 
  Zap, 
  Bug,
  MessageSquare,
  LayoutDashboard,
  FileText,
  Terminal,
  History
} from 'lucide-react';

export type ViewType = 'chat' | 'settings' | 'channels' | 'usage' | 'tasks' | 'agents' | 'skills' | 'debug' | 'docs';

export interface NavItem {
  id: ViewType;
  label: string;
  icon: any;
  category?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'chat', label: '聊天', icon: MessageSquare, category: '聊天' },
  { id: 'usage', label: '概览', icon: LayoutDashboard, category: '控制' },
  { id: 'channels', label: '频道', icon: Radio, category: '控制' },
  { id: 'tasks', label: '定时任务', icon: Clock, category: '控制' },
  { id: 'agents', label: '代理', icon: Bot, category: '代理' },
  { id: 'skills', label: '技能', icon: Zap, category: '代理' },
  { id: 'debug', label: '调试', icon: Bug, category: '设置' },
  { id: 'settings', label: '配置', icon: Settings, category: '设置' },
  { id: 'docs', label: '文档', icon: FileText, category: '资源' },
];

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
