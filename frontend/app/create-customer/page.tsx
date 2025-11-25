"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AddCustomerForm, {
  CustomerFormData,
} from "../customers/AddCustomerForm";

export default function CreateCustomer() {
  const router = useRouter();

  async function addCustomer(data: CustomerFormData) {
    await fetch("http://localhost:4000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/customers");
  }
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between"></header>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Add Customer
      </h2>
      <Link
        href="/customers"
        className="text-slate-500 text-sm hover:text-slate-700"
      >
        ← Customer Overview
      </Link>
      <AddCustomerForm onSubmit={addCustomer} />
    </section>
  );
}
