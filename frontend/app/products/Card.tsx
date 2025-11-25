import Link from "next/link";
import { Product } from "../types/product";


export default function Card({ id, name, description, price }: Product) {
  return (
    <div className="relative block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:-translate-0.5 transition">
      {/* Content klickbar */}
      <Link href={`/products/${id}`} className="block">
        <h3 className="text-sm font-semibold text-slate-500">{name}</h3>
        <p className="mt-1 text-xs text-slate-500">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">{price}€</span>

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-lg">
            +
          </span>
        </div>
      </Link>
    </div>
  );
}
