export enum ProductType {
  WEBSITE = 'Website',
  SCRIPT = 'Script',
  API_PACK = 'API Pack'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  type: ProductType;
  icon: string; 
  includesHosting?: boolean;
}

export interface ApiPack {
  id: string;
  name: string;
  price: number;
  calls: number;
  validityDays: number;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isLoggedIn: boolean;
}

// Added Message interface for the AI ChatBot
export interface Message {
  role: 'user' | 'model';
  text: string;
}