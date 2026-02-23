"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import CategorySidebar from '@/components/CategorySidebar';
import CategoryRow from '@/components/CategoryRow';

const AllProductsPage = () => {
  const searchParams = useSearchParams();
  const initialCategoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryFromUrl);

  useEffect(() => {
    // If there's a category in the URL, prioritize it
    if (initialCategoryFromUrl) {
      setSelectedCategory(initialCategoryFromUrl);
      return;
    }

    // Otherwise, check localStorage
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
      setSelectedCategory(storedCategory);
      localStorage.removeItem('selectedCategory'); // Clear it after use
    }
  }, [initialCategoryFromUrl]);

  const productsByCategory: { [key: string]: typeof products } = categories.reduce((acc, category) => {
    acc[category.slug] = products.filter(product => product.category === category.slug);
    return acc;
  }, {} as { [key: string]: typeof products });

  const displayedCategories = selectedCategory
    ? categories.filter(cat => cat.slug === selectedCategory)
    : categories;

  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="w-full">
        <Image
          src="/ZapShop/Zapbanner.png"
          alt="Banner"
          width={1920}
          height={500}
          className="object-cover"
        />
      </div>
      <div className="flex">
        <CategorySidebar
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <div className="flex-1 p-8">
          {displayedCategories.map((category) => (
            <CategoryRow
              key={category.slug}
              categoryName={category.name}
              products={productsByCategory[category.slug] || []}
            />
          ))}
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

export default AllProductsPage;
