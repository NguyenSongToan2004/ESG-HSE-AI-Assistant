
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface OrganizationProps {
  language: Language;
}

const Organization: React.FC<OrganizationProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">{t.organization}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            🏢
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Corporate Profile</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Manage your organization's core ESG metrics and HSE protocols from a centralized dashboard. 
            View your sustainability performance and compliance status.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
            📈
          </div>
          <h3 className="font-bold text-slate-800 mb-2">Sustainability Goals</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Track your progress against Net Zero commitments and social responsibility initiatives. 
            Visualize data across departments.
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-lg">HSE Compliance Shield</h4>
            <p className="text-slate-400 text-sm mt-1">Your organization is currently 98.2% compliant with local safety regulations.</p>
          </div>
          <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Organization;
