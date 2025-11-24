import { products } from "@/db/db";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function DetailPage({ params }: Props) {
  const { id } = await params;

  const currentIndex = products.findIndex((product) => product.id === id);

  if (currentIndex === -1) {
    return <p className="text-sm text-red-500">Product not found</p>;
  }

  const product = products[currentIndex];

  return (
    <section className="space-y-4">
      <Link
        href="/"
        className="text-sm text-slate-500 hover:text-slate-700 block"
      >
        ← Home
      </Link>
      <article className="space-y-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {product.name}
        </h2>
        <p className="text-sm text-slate-600">{product.description}</p>
        <p className="text-ls font-semibold text-slate-900">
          {product.price},-
        </p>
      </article>
    </section>
  );
}
