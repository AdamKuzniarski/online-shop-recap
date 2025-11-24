"use client";

import Link from "next/link";
import Form, { ProductsFormData } from "../components/Form";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

  function addProduct(data: ProductsFormData) {
    console.log("adding Product");
    console.log("Data", data);
    router.push("/");
  }
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between"></header>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">Add Product</h2>
      <Link href="/" className="text-slate-500 text-sm hover:text-slate-700">← Home</Link>
      <Form onSubmit={addProduct} />
    </section>
  );
}
