"use client";

interface CategorySidebarProps {
  onSelectCategory: (categorySlug: string | null) => void;
  selectedCategory: string | null;
  categories: { name: string; slug: string }[];
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  onClearFilters: () => void;
}

const CategorySidebar = ({ 
  onSelectCategory, 
  selectedCategory, 
  categories,
  maxPrice,
  setMaxPrice,
  onClearFilters
}: CategorySidebarProps) => {
  return (
    <div className="w-72 p-8 bg-zinc-900 border-r border-zinc-800 text-white min-h-[calc(100vh-400px)] space-y-10 sticky top-0">
      {/* Categories Section */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-zinc-100 flex items-center">
          <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-full" />
          Categories
        </h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${!selectedCategory ? 'bg-blue-600/10 text-blue-400 font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
            >
              All Products
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.slug}>
              <button
                onClick={() => onSelectCategory(category.slug)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category.slug ? 'bg-blue-600/10 text-blue-400 font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter Section */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-zinc-100 flex items-center">
          <span className="w-1.5 h-6 bg-blue-600 mr-3 rounded-full" />
          Price Range
        </h2>
        <div className="px-4 space-y-4">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm font-mono text-zinc-500">
            <span>฿0</span>
            <span className="text-blue-400 font-bold text-base">฿{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="px-4">
        <button
          onClick={onClearFilters}
          className="w-full py-3 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white hover:border-blue-500 transition-all text-sm font-semibold cursor-pointer"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default CategorySidebar;
