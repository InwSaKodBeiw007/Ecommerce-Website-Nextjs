import ClientProductPage from './ClientProductPage';

interface ProductPageProps {
  params: { productId: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const awaitedParams = await params; // Await the params object
  const productId = Number(awaitedParams.productId); // Access productId from the awaited object

  return (
    <ClientProductPage productIdProp={productId} />
  );
}
