
import React from 'react';
import ChatBox from '../components/ChatBox';
import { Language } from '../types';

interface HomeProps {
  language: Language;
}

const Home: React.FC<HomeProps> = ({ language }) => {
  return (
    <div className="h-full flex flex-col p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Welcome back.</h2>
        <p className="text-slate-500 text-sm">How can I assist you with your sustainability goals today?</p>
      </div>
      <div className="flex-1 min-h-0">
        <ChatBox language={language} />
      </div>
    </div>
  );
};

export default Home;
