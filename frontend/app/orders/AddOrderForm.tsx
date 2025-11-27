"use client";

import { useState } from "react";
import { Customer } from "../types/customer";
import { Product } from "../types/product";

export type OrderFormData = {
  productIds: number[];
  customerId: number;
  totalPrice: number;
};

type Props = {
  customers: Customer[];
  products: Product[];
  onSubmit: (data: OrderFormData) => void;
};

export default function AddOrderForm({ customers, products, onSubmit }: Props) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  function toggleProduct(productId: number) {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="text-black">
        Keine Kunden vorhanden. Bitte zuerst Kunden anlegen.
      </div>
    );
  }

  function handleCustomerChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = Number(event.target.value);
    const cust = customers.find((c) => c.id === id) || null;
    setSelectedCustomer(cust);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedCustomer || selectedProductIds.length === 0) return;

    const chosenProducts = products.filter((product) =>
      selectedProductIds.includes(product.id)
    );

    const totalPrice = chosenProducts.reduce(
      (sum, product) => sum + Number(product.price),
      0
    );

    const data: OrderFormData = {
      customerId: selectedCustomer.id,
      productIds: selectedProductIds,
      totalPrice,
    };

    onSubmit(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 bg-white p-6 text-black shadow-sm ring-1 ring-slate-100"
    >
      {/* CUSTOMER SELECT */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          Kunde wählen
        </label>
        <select
          required
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm"
          onChange={handleCustomerChange}
        >
          <option value="">Bitte wählen...</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} – {c.email}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-1">
        <span className="block text-sm font-medium text-slate-700">
          Produkte auswählen
        </span>
        <ul className="space-y-2 rounded-xl border border-slate-200 p-3 text-sm">
          {products.map((product) => {
            const checked = selectedProductIds.includes(product.id);
            return (
              <li key={product.id} className="flex items-center gap-3">
                <input
                  id={`product-${product.id}`}
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() => toggleProduct(product.id)}
                />
                <label
                  htmlFor={`product-${product.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <span className="font-semibold">{product.name}</span>
                  <span className="ml-2 text-slate-500">{product.price} €</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
      >
        Order erstellen
      </button>
    </form>
  );
}
