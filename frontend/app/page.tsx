import Card from "./products/Card";
import Link from "next/link";
import { Product } from "./types/product";

export default async function Home() {
  const response = await fetch(`http://localhost:4000/api/products`);
  const products = await response.json();

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800">
            Grocery Store
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Manage your items and see details.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
          >
            + Product
          </Link>
        </div>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-slate-600">
        {products.map((product: Product) => {
          return (
            <li key={product.id}>
              <Card
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
