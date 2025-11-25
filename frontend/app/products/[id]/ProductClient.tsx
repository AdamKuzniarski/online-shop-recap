"use client"

import DeleteButton from "@/app/products/DeleteButton";
import { Pencil } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

type Props = {
  id: string;
};

export default  function DetailPageComponent({ id}: Props) {

  const {data: product, isLoading} = useSWR(id ? `http://localhost:4000/api/products/${id}`: null)

  if (!product || isLoading) return <p>Loading...</p>;
console.log(product)
  return (
    <section className="space-y-4">
      <Link
        href="/"
        className="text-sm text-slate-500 hover:text-slate-700 block"
      >
        ← Home
      </Link>
      <article className="space-y-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <Link
          href={`/products/${id}/edit`}
          className=" top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-lg">
            +
          </span>
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {product.name}
        </h2>
        <p className="text-sm text-slate-600">{product.description}</p>
        <p className="text-ls font-semibold text-slate-900">
          {product.price},-
        </p>
        <DeleteButton id={product.id} />
      </article>
    </section>
  );
}
