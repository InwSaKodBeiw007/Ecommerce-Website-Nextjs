"use client";

import { categories } from '@/data/categories';

interface CategorySidebarProps {
  onSelectCategory: (categorySlug: string | null) => void;
  selectedCategory: string | null;
}

const CategorySidebar = ({ onSelectCategory, selectedCategory }: CategorySidebarProps) => {
  return (
    <div className="w-64 p-6 bg-zinc-900 border-r border-zinc-800 text-white">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        <li className="mb-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`text-lg hover:underline ${!selectedCategory ? 'text-blue-400 font-semibold' : 'text-zinc-400'}`}
          >
            All Products
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.slug} className="mb-2">
            <button
              onClick={() => onSelectCategory(category.slug)}
              className={`text-lg hover:underline ${selectedCategory === category.slug ? 'text-blue-400 font-semibold' : 'text-zinc-400'}`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
