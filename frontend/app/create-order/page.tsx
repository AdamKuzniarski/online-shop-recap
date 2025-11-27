"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AddCustomerForm, {
  CustomerFormData,
} from "../customers/AddCustomerForm";

export default function CreateOrder() {
  const router = useRouter();

  async function addOrder(data: OrderFormData) {
    await fetch("http://localhost:4000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/orders");
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
      <AddOrderForm onSubmit={addOrder} />
    </section>
  );
}
