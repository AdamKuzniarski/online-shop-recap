

import EditForm, { ProductsFormData } from "@/app/components/EditForm";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProduct({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/products/${id}`);
  const product = await response.json();

  async function editProduct(data: ProductsFormData) {
    "use server";

    await fetch(`http://localhost:4000/products/${id}`, {
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
