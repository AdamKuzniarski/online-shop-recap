"use client";

import useSWR from "swr";
import EditCustomerForm, { CustomerFormData } from "../../EditCustomerForm";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

async function editCustomer(id: string, data: CustomerFormData) {
  "use server";

  await fetch(`http://localhost:4000/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  redirect("/customers");
}

export default function EditCustomerClient({ id }: Props) {

  const { data: customer, isLoading } = useSWR(
    `http://localhost:4000/api/customers/${id}`
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Edit Customer
      </h2>
      <EditCustomerForm
        onSubmit={(data) => editCustomer(id, data)}
        initialData={customer}
      />
    </section>
  );
}
