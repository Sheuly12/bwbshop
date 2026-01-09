
import React, { useState } from 'react';
import { ApiPack } from '../types';
import { API_PACKS, SETUP_CHARGE } from '../constants';

interface ApiPricingProps {
  onSelect: (pack: ApiPack) => void;
}

const ApiPricing: React.FC<ApiPricingProps> = ({ onSelect }) => {
  const [selectedPack, setSelectedPack] = useState<ApiPack>(API_PACKS[2]); // Standard as default

  const handlePackChange = (pack: ApiPack) => {
    setSelectedPack(pack);
  };

  return (
    <div id="api" className="py-24 dark:bg-slate-900/80 bg-slate-100/50 border-y dark:border-slate-800 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black dark:text-white text-slate-900 mb-4">Auto TopUp API Packs</h2>
          <p className="dark:text-slate-400 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            High-speed API access at just <span className="text-sky-500 font-bold">0.50 poisa per call</span>. 
            Select a pack that fits your volume and start scaling today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Pack Selection System */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {API_PACKS.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => handlePackChange(pack)}
                  className={`p-6 rounded-3xl border transition-all text-left group relative ${
                    selectedPack.id === pack.id
                      ? 'dark:bg-sky-500/10 bg-sky-50 border-sky-500 ring-4 ring-sky-500/10'
                      : 'dark:bg-slate-800/40 bg-white dark:border-slate-700 border-slate-200 hover:border-sky-300 dark:hover:border-slate-500 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl">{pack.icon}</span>
                    {selectedPack.id === pack.id && (
                      <div className="bg-sky-500 p-1.5 rounded-full shadow-lg shadow-sky-500/30">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-black dark:text-white text-slate-900 mb-1 tracking-tight">{pack.name}</h3>
                  <p className="dark:text-slate-400 text-slate-500 text-sm font-bold">{pack.calls.toLocaleString()} API Requests</p>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-3xl font-black dark:text-white text-slate-900">{pack.price}৳</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-6 dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/20 border-amber-200 rounded-3xl flex items-start space-x-4 mt-8">
              <div className="p-2 dark:bg-amber-500/20 bg-amber-100 rounded-xl">
                <svg className="w-6 h-6 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h5 className="text-amber-600 dark:text-amber-500 font-black uppercase tracking-[0.15em] text-xs mb-1">Service Notice</h5>
                <p className="text-sm dark:text-amber-200/70 text-amber-900/70 leading-relaxed font-medium">
                  All API packs are valid for exactly 30 days from purchase. 
                  A one-time <span className="font-black dark:text-white text-slate-900">{SETUP_CHARGE}৳ setup fee</span> is required for your account activation.
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Preview */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="glass rounded-[3rem] p-10 border dark:border-slate-700 border-slate-200 shadow-2xl">
              <h3 className="text-2xl font-black dark:text-white text-slate-900 mb-8 tracking-tight">Purchase Summary</h3>
              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-lg">
                  <span className="dark:text-slate-400 text-slate-500 font-medium">Selected Plan</span>
                  <span className="dark:text-white text-slate-900 font-black">{selectedPack.name}</span>
                </div>
                <div className="flex justify-between items-center text-lg border-b dark:border-slate-800 border-slate-100 pb-5">
                  <span className="dark:text-slate-400 text-slate-500 font-medium">Total API Calls</span>
                  <span className="text-sky-500 font-black">{selectedPack.calls.toLocaleString()}</span>
                </div>
                <div className="space-y-3 pt-5 font-bold">
                  <div className="flex justify-between items-center dark:text-slate-300 text-slate-600">
                    <span>Pack Price</span>
                    <span className="dark:text-white text-slate-900">{selectedPack.price}৳</span>
                  </div>
                  <div className="flex justify-between items-center dark:text-slate-300 text-slate-600">
                    <span>Setup Charge</span>
                    <span className="dark:text-white text-slate-900">{SETUP_CHARGE}৳</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-10 pt-6 border-t dark:border-slate-800 border-slate-100">
                <span className="text-xl font-black dark:text-white text-slate-900">Total Pay</span>
                <span className="text-4xl font-black text-sky-500">{selectedPack.price + SETUP_CHARGE}৳</span>
              </div>
              
              <button 
                onClick={() => onSelect(selectedPack)}
                className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-xl shadow-sky-600/30 text-lg group animate-pulse hover:animate-none"
              >
                <span>Purchase Now</span>
                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              <p className="text-center mt-6 text-xs dark:text-slate-500 text-slate-400 font-black uppercase tracking-widest">
                SSL Secured Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPricing;
