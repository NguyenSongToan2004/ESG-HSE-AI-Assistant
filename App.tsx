
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Organization from './pages/Organization';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.VIETNAMESE);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar language={language} setLanguage={setLanguage} />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -z-10 -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-100/20 rounded-full blur-3xl -z-10 -ml-24 -mb-24"></div>
          
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/organization" element={<Organization language={language} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
