
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language, TranslationStrings } from '../types';
import { TRANSLATIONS } from '../constants';

interface SidebarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ language, setLanguage }) => {
  const t = TRANSLATIONS[language];
  const location = useLocation();

  const navItems = [
    { path: '/', label: t.home, icon: '🏠' },
    { path: '/organization', label: t.organization, icon: '🏢' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0">
      {/* Top User Section */}
      <div className="p-6 border-bottom border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-medium border border-slate-200">
            G
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{t.guest}</p>
            <p className="text-xs text-slate-500 italic">Connected</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        <h3 className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Menu
        </h3>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Language Selector Bottom Section */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
          {t.language}
        </p>
        <div className="grid grid-cols-1 gap-1">
          <button
            onClick={() => setLanguage(Language.VIETNAMESE)}
            className={`text-xs px-3 py-2 rounded-md text-left transition-colors ${
              language === Language.VIETNAMESE ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-medium' : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            🇻🇳 Tiếng Việt
          </button>
          <button
            onClick={() => setLanguage(Language.ENGLISH)}
            className={`text-xs px-3 py-2 rounded-md text-left transition-colors ${
              language === Language.ENGLISH ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-medium' : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => setLanguage(Language.ALBANIAN)}
            className={`text-xs px-3 py-2 rounded-md text-left transition-colors ${
              language === Language.ALBANIAN ? 'bg-white shadow-sm border border-slate-200 text-slate-800 font-medium' : 'text-slate-500 hover:bg-white/50'
            }`}
          >
            🇦🇱 Albanian
          </button>
        </div>
        <div className="mt-4 text-[10px] text-center text-slate-400">
          &copy; 2024 {t.assistantName}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
