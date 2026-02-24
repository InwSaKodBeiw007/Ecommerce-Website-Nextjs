"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CategorySidebar from '@/components/CategorySidebar';
import CategoryRow from '@/components/CategoryRow';

interface AllProductsClientProps {
  initialProducts: any[];
  initialCategories: any[];
}

const AllProductsClient = ({ initialProducts, initialCategories }: AllProductsClientProps) => {
  const searchParams = useSearchParams();
  const initialCategoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryFromUrl);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(100); // Default price range max set to 100

  useEffect(() => {
    if (initialCategoryFromUrl) {
      setSelectedCategory(initialCategoryFromUrl);
      return;
    }

    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
      localStorage.removeItem('selectedCategory');
    }
  }, [initialCategoryFromUrl]);

  // Combined filtering logic
  const filteredProducts = initialProducts.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const productsByCategory: { [key: string]: any[] } = initialCategories.reduce((acc, category) => {
    acc[category.slug] = filteredProducts.filter(product => product.category === category.slug);
    return acc;
  }, {} as { [key: string]: any[] });

  const displayedCategories = (selectedCategory
    ? initialCategories.filter(cat => cat.slug === selectedCategory)
    : initialCategories).filter(cat => productsByCategory[cat.slug]?.length > 0);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setMaxPrice(100);
  };

  return (
    <div className="bg-zinc-950 min-h-screen pt-20">
      <div className="w-full">
        <Image
          src="/ZapShop/Zapbanner.png"
          alt="Banner"
          width={1920}
          height={500}
          className="object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-8 pt-12">
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search for amazing gadgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-all shadow-xl"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex container mx-auto">
        <CategorySidebar
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          categories={initialCategories}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onClearFilters={clearFilters}
        />
        <div className="flex-1 p-8">
          {displayedCategories.length > 0 ? (
            displayedCategories.map((category) => (
              <CategoryRow
                key={category.slug}
                categoryName={category.name}
                products={productsByCategory[category.slug] || []}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-zinc-500">No products found matching your criteria.</h3>
              <button 
                onClick={clearFilters}
                className="mt-4 text-blue-500 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Contact Me button */}
      <a
        href="https://www.facebook.com/thanawat.poomikan"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors cursor-pointer z-50"
      >
        Contact me
      </a>
    </div>
  );
};

export default AllProductsClient;
