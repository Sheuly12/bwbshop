import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ApiPricing from './components/ApiPricing';
import ChatBot from './components/ChatBot';
import { MAIN_PRODUCTS, SETUP_CHARGE, FAQS } from './constants';
import { User, Product, ApiPack } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const filteredProducts = useMemo(() => {
    return MAIN_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleLogin = () => {
    const mockUser: User = {
      id: '1',
      name: 'John Developer',
      email: 'john@github.com',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      isLoggedIn: true
    };
    setUser(mockUser);
    showNotification('Welcome! Logged in via GitHub.');
  };

  const handleLogout = () => {
    setUser(null);
    showNotification('Logged out successfully.');
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePurchase = (item: Product | ApiPack) => {
    if (!user) {
      showNotification('Please login with GitHub to buy.');
      return;
    }

    const isApiPack = 'calls' in item;
    const finalPrice = isApiPack ? (item.price + SETUP_CHARGE) : item.price;
    
    const message = `Hello, I want to buy this "${item.name} and ${finalPrice} tk" Give me more details`;
    const encodedMsg = encodeURIComponent(message);
    const telegramUrl = `https://t.me/alfishahor?text=${encodedMsg}`;

    window.open(telegramUrl, '_blank');
    showNotification(`Opening Telegram for ${item.name}...`);
  };

  return (
    <div className="min-h-screen dark:bg-slate-950 bg-slate-50 transition-colors duration-300">
      <Navbar user={user} isDarkMode={isDarkMode} toggleTheme={toggleTheme} onLogin={handleLogin} onLogout={handleLogout} />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="dark:bg-sky-600/90 bg-sky-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-black border dark:border-sky-400/50 border-sky-400 flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-56">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] dark:bg-sky-500/20 bg-sky-500/10 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] dark:bg-indigo-500/10 bg-indigo-500/5 rounded-full blur-[140px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full dark:bg-slate-800/50 bg-white dark:border-slate-700 border-slate-200 dark:text-sky-400 text-sky-600 text-xs font-black tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping"></span>
            <span>Premium Web Marketplace</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black dark:text-white text-slate-900 tracking-tighter mb-8 leading-[0.85]">
            Market For <br />
            <span className="gradient-text italic">Innovators.</span>
          </h1>
          <p className="text-xl dark:text-slate-400 text-slate-600 max-w-2xl mx-auto leading-relaxed mb-16 font-medium">
            Deploy elite automation scripts and scalable APIs in minutes. 
            Crafted for speed, built for reliability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="#products" 
              onClick={(e) => scrollToSection(e, 'products')}
              className="group w-full sm:w-auto px-12 py-5 dark:bg-white bg-slate-900 dark:text-slate-950 text-white font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl dark:shadow-white/10 shadow-slate-900/20 text-lg text-center"
            >
              Explore Scripts
            </a>
            <a 
              href="#api" 
              onClick={(e) => scrollToSection(e, 'api')}
              className="w-full sm:w-auto px-12 py-5 glass dark:text-white text-slate-700 font-black rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all border dark:border-slate-700 border-slate-200 text-lg hover:border-sky-500 text-center"
            >
              API Portal
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y dark:border-slate-900 border-slate-200 dark:bg-slate-900/30 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Happy Clients', val: '500+' },
              { label: 'Scripts Delivered', val: '1.2k' },
              { label: 'Server Uptime', val: '99.9%' },
              { label: 'Countries', val: '12+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-black dark:text-white text-slate-900 mb-2">{stat.val}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Products Grid */}
      <section id="products" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black dark:text-white text-slate-900 mb-6 tracking-tight leading-tight uppercase">Premium <br/><span className="text-sky-500">Inventory</span></h2>
              <p className="dark:text-slate-400 text-slate-600 text-lg font-medium leading-relaxed">
                Hand-crafted scripts with deep automation. Each asset is optimized for speed, security, and conversion.
              </p>
            </div>
            
            {/* Search Bar Feature */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-0 bg-sky-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <input 
                type="text" 
                placeholder="Search assets..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-5 rounded-[2rem] glass dark:text-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border dark:border-slate-800 border-slate-200 font-bold transition-all"
              />
              <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/50 to-indigo-500/50 rounded-[3rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative glass rounded-[3rem] p-10 border dark:border-slate-800 border-slate-200 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl">
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-sky-500 uppercase tracking-[0.3em] mb-3">{product.type}</span>
                       <h3 className="text-3xl font-black dark:text-white text-slate-900 leading-tight tracking-tight">{product.name}</h3>
                    </div>
                    <div className="w-20 h-20 dark:bg-slate-900/80 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner border dark:border-slate-800/50 border-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {product.icon}
                    </div>
                  </div>

                  <p className="dark:text-slate-400 text-slate-600 text-lg mb-10 leading-relaxed font-medium">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {product.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs font-black uppercase tracking-wider dark:text-slate-300 text-slate-500 dark:bg-slate-800/30 bg-slate-100/50 p-4 rounded-2xl border dark:border-slate-700/50 border-slate-200/50">
                        <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center mr-3 shrink-0">
                          <svg className="w-3 h-3 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-8 border-t dark:border-slate-800/50 border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black dark:text-slate-500 text-slate-400 uppercase tracking-[0.2em] mb-1">Price Point</span>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-black dark:text-white text-slate-900">{product.price}৳</span>
                        {product.includesHosting && (
                           <span className="text-[9px] text-green-500 font-black uppercase bg-green-500/10 px-2 py-1 rounded-lg">Hosting Incl.</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="p-5 glass dark:text-slate-400 text-slate-500 hover:text-sky-500 dark:hover:text-white rounded-2xl border dark:border-slate-700 border-slate-200 hover:border-sky-300 transition-all shadow-sm"
                        title="View Details"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handlePurchase(product)}
                        className="px-8 py-5 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-sky-600/20 active:scale-95 flex items-center space-x-3"
                      >
                        <span>Buy Now</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center glass rounded-[3rem] border-dashed border-2 border-slate-800">
                <div className="text-6xl mb-6 opacity-30">🔍</div>
                <h3 className="text-2xl font-black dark:text-white text-slate-900 mb-2">No assets found</h3>
                <p className="text-slate-500 font-medium">Try a different search term or browse our categories.</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-8 py-3 bg-sky-600/10 text-sky-500 font-bold rounded-xl hover:bg-sky-600/20 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 dark:bg-slate-950 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black dark:text-white text-slate-900 mb-4 uppercase tracking-tighter">Quick Knowledge</h2>
            <p className="dark:text-slate-500 text-slate-400 font-bold tracking-widest uppercase text-xs">Everything you need to know about our scripts</p>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass rounded-3xl border dark:border-slate-800 border-slate-100 overflow-hidden transition-all">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className="text-xl font-black dark:text-white text-slate-900 tracking-tight">{faq.question}</span>
                  <div className={`w-10 h-10 rounded-full border dark:border-slate-700 border-slate-200 flex items-center justify-center transition-all ${activeFaq === i ? 'rotate-45 bg-sky-500 border-sky-500' : ''}`}>
                    <svg className={`w-5 h-5 ${activeFaq === i ? 'text-white' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-lg dark:text-slate-400 text-slate-600 leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Pricing Section */}
      <ApiPricing onSelect={handlePurchase} />

      {/* Footer */}
      <footer id="about" className="py-32 border-t dark:border-slate-900 border-slate-200 dark:bg-slate-950 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-sky-600/30">B</div>
                <span className="text-3xl font-black dark:text-white text-slate-900 tracking-tighter uppercase">BWB Shop</span>
              </div>
              <p className="dark:text-slate-400 text-slate-600 text-lg font-medium leading-relaxed max-w-sm mb-10">
                Architecting premium digital tools for scaling businesses across Bangladesh and beyond.
              </p>
              <div className="flex space-x-4">
                {['TW', 'TG', 'FB'].map(social => (
                  <div key={social} className="w-12 h-12 rounded-2xl glass flex items-center justify-center dark:text-slate-400 text-slate-500 font-black text-xs hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 cursor-pointer transition-all shadow-sm">
                    {social}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black dark:text-white text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px] text-sky-500">Navigation</h4>
              <ul className="space-y-4 dark:text-slate-500 text-slate-500 font-bold text-sm">
                <li><a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="dark:hover:text-white hover:text-sky-600 cursor-pointer transition-colors">Digital Assets</a></li>
                <li><a href="#api" onClick={(e) => scrollToSection(e, 'api')} className="dark:hover:text-white hover:text-sky-600 cursor-pointer transition-colors">API Pricing</a></li>
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">Network Status</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black dark:text-white text-slate-900 mb-8 uppercase tracking-[0.2em] text-[10px] text-sky-500">Governance</h4>
              <ul className="space-y-4 dark:text-slate-500 text-slate-500 font-bold text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                <li className="hover:text-white cursor-pointer transition-colors">Refund Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t dark:border-slate-900 border-slate-200 text-center dark:text-slate-600 text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">
            &copy; {new Date().getFullYear()} BWB Shop. Bangladesh.
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 dark:bg-slate-950/90 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="glass w-full max-w-3xl rounded-[3.5rem] border dark:border-slate-700/50 border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-300 shadow-3xl">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-8 right-8 p-3 dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-red-500 dark:bg-slate-800/80 bg-white rounded-2xl z-20 transition-all hover:rotate-90 shadow-sm"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-12">
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-24 h-24 dark:bg-slate-900 bg-slate-50 rounded-[2rem] border dark:border-slate-700 border-slate-200 flex items-center justify-center text-5xl shadow-2xl">
                  {selectedProduct.icon}
                </div>
                <div>
                  <span className="text-sky-500 font-black text-xs tracking-[0.3em] uppercase mb-2 block">{selectedProduct.type}</span>
                  <h2 className="text-5xl font-black dark:text-white text-slate-900 tracking-tight">{selectedProduct.name}</h2>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-slate-200 px-8 py-5 rounded-[2rem] shadow-sm">
                  <span className="dark:text-slate-500 text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Market Price</span>
                  <span className="text-3xl font-black dark:text-white text-slate-900">{selectedProduct.price}৳</span>
                </div>
                {selectedProduct.includesHosting && (
                   <div className="bg-green-500/10 border border-green-500/20 px-8 py-5 rounded-[2rem] flex flex-col justify-center">
                    <span className="text-green-600 text-[10px] font-black uppercase tracking-widest">Bonus Pack</span>
                    <span className="text-xs text-green-700 dark:text-green-400 font-bold italic">Cloud Hosting Included</span>
                  </div>
                )}
              </div>

              <div className="space-y-10">
                <div className="p-8 dark:bg-slate-900/40 bg-slate-50/50 rounded-[2.5rem] border dark:border-slate-800 border-slate-100 shadow-inner">
                  <h4 className="dark:text-white text-slate-900 font-black mb-4 uppercase tracking-[0.2em] text-[10px] text-sky-500">Abstract Overview</h4>
                  <p className="dark:text-slate-300 text-slate-700 text-lg leading-relaxed font-medium">{selectedProduct.description}</p>
                </div>
                
                <div>
                  <h4 className="dark:text-white text-slate-900 font-black mb-6 uppercase tracking-[0.2em] text-[10px] text-sky-500">Component Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProduct.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-4 dark:text-slate-300 text-slate-600 dark:bg-slate-800/20 bg-white p-5 rounded-2xl border dark:border-slate-700/50 border-slate-200 shadow-sm">
                        <div className="w-8 h-8 bg-sky-500/10 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => {
                    handlePurchase(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-6 dark:bg-white bg-slate-900 dark:text-slate-950 text-white font-black rounded-[1.5rem] transition-all shadow-2xl dark:shadow-white/5 shadow-slate-900/20 text-xl flex items-center justify-center space-x-4 hover:scale-[1.02] active:scale-95"
                >
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Order Now</span>
                </button>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-10 py-6 glass dark:text-slate-400 text-slate-500 font-black rounded-[1.5rem] hover:text-sky-500 dark:hover:text-white transition-all shadow-sm"
                >
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Sales Assistant */}
      <ChatBot />
    </div>
  );
};

export default App;