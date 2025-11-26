"use client";

import Link from "next/link";
import { Customer } from "../types/customer";
import CardCustomer from "../components/CardCustomer";
import useSWR from "swr";

export default function CustomerPage() {
  const {
    data: customers,
    isLoading,
    error,
  } = useSWR(`http://localhost:4000/api/customers`);

  if (!customers || isLoading || error) return <div>isLoading</div>;
  console.log(customers);

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800">
            Customer Overview
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Manage customers and see details.
          </p>
          <Link
            href="/create-customer"
            className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
          >
            + Customer
          </Link>
        </div>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-slate-600">
        {customers.map((customer: Customer) => {
          return (
            <li key={customer.id}>
              <CardCustomer
                id={customer.id}
                name={customer.name}
                email={customer.email}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
