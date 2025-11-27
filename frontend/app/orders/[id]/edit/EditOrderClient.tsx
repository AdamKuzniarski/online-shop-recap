"use client";

import useSWR from "swr";
import { redirect } from "next/navigation";
import EditOrderForm, { OrderFormData } from "../../EditOrderForm";

type Props = {
  id: string;
};

async function editOrder(id: string, data: OrderFormData) {
  await fetch(`http://localhost:4000/api/orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  redirect("/orders");
}

export default function EditOrderClient({ id }: Props) {
  // Order laden
  const { data: order, isLoading: loadingOrder } = useSWR(
    `http://localhost:4000/api/orders/${id}`
  );

  // Kunden laden
  const { data: customers, isLoading: loadingCustomers } = useSWR(
    "http://localhost:4000/api/customers"
  );

  // Produkte laden
  const { data: products, isLoading: loadingProducts } = useSWR(
    "http://localhost:4000/api/products"
  );

  if (loadingOrder || loadingCustomers || loadingProducts) {
    return <p>Loading...</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Edit Order
      </h2>

      <EditOrderForm
        customers={customers}
        products={products}
        initialData={order}
        onSubmit={(data) => editOrder(id, data)}
      />
    </section>
  );
}
