"use client";

import useSWR from "swr";
import EditCustomerForm, { CustomerFormData } from "../../EditCustomerForm";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

async function editCustomer(id: string, data: CustomerFormData) {
 console.log("trying to edit customer by fetching")

  const response = await fetch(`http://localhost:4000/api/customers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
console.log("server responded with: " + response)
  redirect("/customers");
}

export default function EditCustomerClient({ id }: Props) {

  const { data: customer, isLoading } = useSWR(
    `http://localhost:4000/api/customers/${id}`
  );

  if (isLoading) return <p>Loading...</p>;
console.log(customer);
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
