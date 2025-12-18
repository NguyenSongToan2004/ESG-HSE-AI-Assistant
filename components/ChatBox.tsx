
import React, { useState, useRef, useEffect } from 'react';
import { Message, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { getGeminiResponse } from '../services/geminiService';
import { extractPdfTextFromUrl } from '../utils/pdfExtractor';

interface ChatBoxProps {
  language: Language;
}

const ChatBox: React.FC<ChatBoxProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [documentText, setDocumentText] = useState('');
  const [isDocLoading, setIsDocLoading] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    const loadDocument = async () => {
      try {
        const text = await extractPdfTextFromUrl('/hse_6s_guidelines.pdf');
        setDocumentText(text);
      } catch (err) {
        console.error("Failed to load document", err);
      } finally {
        setIsDocLoading(false);
      }
    };

    loadDocument();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (isDocLoading) {
      alert("Document is still loading, please wait.");
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(inputValue, documentText, language === Language.ENGLISH ? 'Vietnamese' : language === Language.ENGLISH ? 'English' : 'Albanian');

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200 mx-auto w-full max-w-4xl transition-all duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-200">
            AI
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800 tracking-tight">{t.assistantName}</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-medium">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setMessages([])}
          className="text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1 hover:bg-red-50 rounded"
        >
          {t.newChat}
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="text-4xl mb-4">🌱</div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              {t.greeting}
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100 rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-none'
                  }`}
              >
                {msg.content}
                <div className={`text-[10px] mt-1.5 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`p-3 rounded-xl transition-all ${!inputValue.trim() || isLoading
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-105 active:scale-95'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
          Specializing in ESG & HSE
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
