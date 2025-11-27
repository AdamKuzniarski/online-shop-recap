"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AddOrderForm, { OrderFormData } from "../orders/AddOrderForm";
import useSWR from "swr";

export default function CreateOrder() {
  const router = useRouter();

  const { data: customers } = useSWR("http://localhost:4000/api/customers");
  const { data: products } = useSWR("http://localhost:4000/api/products");

  async function addOrder(data: OrderFormData) {
    await fetch("http://localhost:4000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/orders");
  }

  if (!customers || !products) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between"></header>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Add Order
      </h2>
      <Link
        href="/orders"
        className="text-slate-500 text-sm hover:text-slate-700"
      >
        ← Orders Overview
      </Link>
      <AddOrderForm
        onSubmit={addOrder}
        customers={customers}
        products={products}
      />
    </section>
  );
}
