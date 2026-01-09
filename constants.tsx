
import React from 'react';
import { Product, ProductType, ApiPack } from './types';

export const MAIN_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Auto Top Up Website',
    price: 3000,
    description: 'A fully automated top-up solution with real-time processing.',
    features: [
      'Automatic Transaction Processing',
      'User Dashboard',
      'Admin Panel',
      'Free Hosting Included',
      'Custom Design'
    ],
    type: ProductType.WEBSITE,
    includesHosting: true,
    icon: '⚡'
  },
  {
    id: 'p2',
    name: 'Tournament Website',
    price: 2500,
    description: 'Perfect for hosting gaming tournaments and managing leaderboards.',
    features: [
      'Match Scheduling',
      'Leaderboard System',
      'Wallet & Payment Integration',
      'Free Hosting Included',
      'Automated Payouts'
    ],
    type: ProductType.WEBSITE,
    includesHosting: true,
    icon: '🏆'
  },
  {
    id: 'p3',
    name: 'Auto Payment Gateway Script',
    price: 2000,
    description: 'Professional script to automate payment reception on any site.',
    features: [
      'PHP/Laravel Based',
      'Multiple Gateway Support',
      'Webhook Integration',
      'Secure Callback System',
      'Installation Documentation'
    ],
    type: ProductType.SCRIPT,
    icon: '💳'
  },
  {
    id: 'p4',
    name: 'Domain Hosting Website Script',
    price: 2000,
    description: 'Start your own hosting business with this full-featured script.',
    features: [
      'Domain Search API Integration',
      'Hosting Plan Management',
      'Invoicing System',
      'Client Portal',
      'WHMCS Compatible'
    ],
    type: ProductType.SCRIPT,
    icon: '🌐'
  }
];

export const API_PACKS: ApiPack[] = [
  { id: 'api-1', name: 'Starter Pack', price: 250, calls: 500, validityDays: 30, icon: '🌟' },
  { id: 'api-2', name: 'Basic Pack', price: 500, calls: 1000, validityDays: 30, icon: '🌱' },
  { id: 'api-3', name: 'Standard Pack', price: 1000, calls: 2000, validityDays: 30, icon: '🌤️' },
  { id: 'api-4', name: 'Growth Pack', price: 1500, calls: 3000, validityDays: 30, icon: '🌟' },
  { id: 'api-5', name: 'Business Pack', price: 2000, calls: 4000, validityDays: 30, icon: '💼' },
  { id: 'api-6', name: 'Premium Pack', price: 2500, calls: 5000, validityDays: 30, icon: '💎' },
  { id: 'api-7', name: 'Pro Pack', price: 3000, calls: 6000, validityDays: 30, icon: '⚡' },
  { id: 'api-8', name: 'Ultra Pack', price: 3500, calls: 7000, validityDays: 30, icon: '🔥' },
  { id: 'api-9', name: 'Mega Pack', price: 4000, calls: 8000, validityDays: 30, icon: '🚀' }
];

export const FAQS = [
  {
    question: "How long does setup take?",
    answer: "Most scripts are delivered instantly after purchase. For full websites including hosting, setup typically takes 1-3 hours."
  },
  {
    question: "Is domain name included?",
    answer: "No, we provide the script and hosting as per the package, but you must provide your own domain name."
  },
  {
    question: "Do you offer custom development?",
    answer: "Yes, we can customize any script to your specific needs. Contact our support via Telegram for a quote."
  },
  {
    question: "What is your refund policy?",
    answer: "Due to the digital nature of scripts, we generally do not offer refunds once the source code is delivered, unless there is a critical bug we cannot fix."
  }
];

export const SETUP_CHARGE = 200;
