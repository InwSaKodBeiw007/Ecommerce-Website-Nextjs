import ProductCard from './ProductCard';

interface CategoryRowProps {
  categoryName: string;
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
}

const CategoryRow = ({ categoryName, products }: CategoryRowProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4 capitalize text-white">{categoryName}</h2>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] max-w-[250px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
