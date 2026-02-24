import { getOrderById } from "@/app/actions/order";
import ConfirmOrderClient from "./ConfirmOrderClient";
import { notFound } from "next/navigation";

interface ConfirmOrderPageProps {
  searchParams: { orderId?: string };
}

export default async function ConfirmOrderPage({ searchParams }: ConfirmOrderPageProps) {
  const awaitedSearchParams = await searchParams;
  const orderId = Number(awaitedSearchParams.orderId);

  if (!orderId) {
    notFound();
  }

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <ConfirmOrderClient order={order} />
  );
}
