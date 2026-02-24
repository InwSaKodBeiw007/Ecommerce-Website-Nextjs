import { getProductById } from "@/app/actions/products";
import ClientProductPage from './ClientProductPage';
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const awaitedParams = await params;
  const productId = Number(awaitedParams.productId);

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  // Transform data for client component
  const transformedProduct = {
    ...product,
    description: product.description || "",
  };

  return (
    <ClientProductPage productProp={transformedProduct} />
  );
}
