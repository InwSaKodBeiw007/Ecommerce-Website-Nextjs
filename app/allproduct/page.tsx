import { getProducts, getCategories } from "@/app/actions/products";
import AllProductsClient from "./AllProductsClient";

export default async function AllProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  // Transform data to match the format expected by the client component
  const transformedProducts = products.map(p => ({
    ...p,
    category: p.category.slug,
    description: p.description || "",
  }));

  const transformedCategories = categories.map(c => ({
    name: c.name,
    slug: c.slug,
  }));

  return (
    <AllProductsClient 
      initialProducts={transformedProducts} 
      initialCategories={transformedCategories} 
    />
  );
}
