import React from 'react';
import {
  Tv,
  Wind,
  Refrigerator,
  Sparkles,
  Laptop,
  Smartphone,
  Zap,
  Flame,
  Fan,
  Cpu,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';

interface CategoryItem {
  id: ProductCategory | 'ALL';
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'ALL', name: 'All Electronics', icon: Layers },
  { id: 'TVs', name: 'Smart TVs', icon: Tv },
  { id: 'Air Conditioners', name: 'Air Conditioners', icon: Wind },
  { id: 'Refrigerators', name: 'Refrigerators', icon: Refrigerator },
  { id: 'Generators', name: 'Generators', icon: Zap },
  { id: 'Washing Machines', name: 'Washing Machines', icon: Sparkles },
  { id: 'Laptops', name: 'Laptops & Mac', icon: Laptop },
  { id: 'Phones', name: 'Phones & Tablets', icon: Smartphone },
  { id: 'Kitchen Appliances', name: 'Kitchen & Cookers', icon: Flame },
  { id: 'Home Appliances', name: 'Home Appliances', icon: Fan },
  { id: 'Electronics Accessories', name: 'Solar & Inverters', icon: Cpu }
];

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory, currentView, setCurrentView } = useApp();

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-sm sticky top-18 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (currentView !== 'store') setCurrentView('store');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
