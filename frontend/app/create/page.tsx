"use client";

import Link from "next/link";
import Form, { ProductsFormData } from "../products/EditForm";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

  async function addProduct(data: ProductsFormData) {
    await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/");
  }
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between"></header>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Add Product
      </h2>
      <Link href="/" className="text-slate-500 text-sm hover:text-slate-700">
        ← Home
      </Link>
      <Form onSubmit={addProduct} />
    </section>
  );
}
