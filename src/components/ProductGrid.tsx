import React, { useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useApp();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
        return false;
      }
      // Condition filter
      if (selectedCondition !== 'ALL' && p.condition !== selectedCondition) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedCondition, searchQuery, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="product-catalog">
      {/* Top Controls: Filter by Condition & Sort By */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              {selectedCategory === 'ALL' ? 'Featured Electronics Collection' : selectedCategory}
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded">
              {filteredProducts.length} items
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Genuine brand new appliances & tested UK used electronics with Alaba store warranty
          </p>
        </div>

        {/* Condition Filter Controls & Sort selector */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Segmented Condition Selector */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setSelectedCondition('ALL')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedCondition === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setSelectedCondition('BRAND NEW')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedCondition === 'BRAND NEW'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Brand New
            </button>
            <button
              onClick={() => setSelectedCondition('UK USED')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedCondition === 'UK USED'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UK Used
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              <option value="featured" className="bg-slate-900">Featured First</option>
              <option value="price_low" className="bg-slate-900">Price: Low to High</option>
              <option value="price_high" className="bg-slate-900">Price: High to Low</option>
              <option value="rating" className="bg-slate-900">Top Customer Rating</option>
              <option value="newest" className="bg-slate-900">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips bar (if filtered) */}
      {(selectedCategory !== 'ALL' || selectedCondition !== 'ALL' || searchQuery) && (
        <div className="flex items-center gap-2 py-3 text-xs flex-wrap">
          <span className="text-slate-500">Active Filters:</span>
          {selectedCategory !== 'ALL' && (
            <span className="bg-slate-800 text-cyan-400 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              Category: {selectedCategory}
              <button
                onClick={() => setSelectedCategory('ALL')}
                className="hover:text-white"
              >
                ×
              </button>
            </span>
          )}
          {selectedCondition !== 'ALL' && (
            <span className="bg-slate-800 text-cyan-400 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              Condition: {selectedCondition}
              <button
                onClick={() => setSelectedCondition('ALL')}
                className="hover:text-white"
              >
                ×
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="bg-slate-800 text-cyan-400 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              Query: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-white"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedCondition('ALL');
              setSearchQuery('');
            }}
            className="text-slate-400 hover:text-white underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No products found</h3>
          <p className="text-xs text-slate-400">
            We couldn't find any electronics matching your current search or category filter. Check other categories or request via WhatsApp.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedCondition('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
          >
            View All Products
          </button>
        </div>
      )}
    </section>
  );
};
