import Link from "next/link";
import { Pencil } from "lucide-react";
import { Product } from "@/app/types/product";
import DeleteOrderButton from "./DeleteOrderButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailOrderPage({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/api/orders/${id}`);
  const order = await response.json();

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <section className="space-y-4">
      <Link
        href="/orders"
        className="text-sm text-slate-500 hover:text-slate-700 block"
      >
        ← Order Overview
      </Link>
      <article className="space-y-2 rounded-2xl bg-white text-black p-6 shadow-sm ring-1 ring-slate-100">
        <Link
          href={`/orders/${id}/edit`}
          className=" top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {order.customer.name}
        </h2>
        <ul>
          {order.products && order.products.length > 0
            ? order.products.map((product: Product) => (
                <li key={product.id}>
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </li>
              ))
            : "Keine Produkte gefunden!"}
        </ul>
        <p className="mt-1 text-xs text-slate-500">{order.totalPrice}</p>
        <DeleteOrderButton id={id} />
      </article>
    </section>
  );
}
