"use client";
import EditForm, { ProductsFormData } from "@/app/products/EditForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import useSWR from "swr";

type Props = {
  id: string;
};

export default function EditProductClient({ id }: Props) {
  const { data: product, isLoading } = useSWR(
    id ? `http://localhost:4000/api/products/${id}` : null
  );

  if (!product || isLoading) return <p>Loading...</p>;

  async function editProduct(data: ProductsFormData) {
    

    await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    redirect("/");
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Edit Product
      </h2>
      <Link href="/" className="text-slate-500 text-sm hover:text-slate-700">
        ← Home
      </Link>
      <EditForm onSubmit={editProduct} initialData={product} />
    </section>
  );
}
