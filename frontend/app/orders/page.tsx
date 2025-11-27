"use client";
import Link from "next/link";
import useSWR from "swr";

import { Order } from "../types/order";
import CardOrder from "./CardOrder";

export default function OrdersPage() {
  const {
    data: orders,
    isLoading,
    error,
  } = useSWR(`http://localhost:4000/api/orders`);

  if (!orders || isLoading || error) return <div>isLoading</div>;
  console.log(orders);

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800">
            Orders Overview
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Manage orders and see details.
          </p>
          <Link
            href="/create-orders"
            className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
          >
            + Orders
          </Link>
        </div>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-slate-600">
        {orders.map((order: Order) => {
          return (
            <li key={order.id}>
              <CardOrder
                id={order.id}
                totalPrice={order.totalPrice}
                price={order.price}
                customer={order.customer}
                products={order.products}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
