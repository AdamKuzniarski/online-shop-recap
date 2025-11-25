import Link from "next/link";
import { redirect } from "next/navigation";
import EditCustomerForm, { CustomerFormData } from "../../EditCustomerForm";


type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCustomer({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/api/customers/${id}`);
  const customer = await response.json();

  async function editCustomer(data: CustomerFormData) {
    "use server";

    await fetch(`http://localhost:4000/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    redirect("/customers");
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Edit Customer
      </h2>
      <Link
        href="/customers"
        className="text-slate-500 text-sm hover:text-slate-700"
      >
        ← Customer Overview
      </Link>
      <EditCustomerForm onSubmit={editCustomer} initialData={customer} />
    </section>
  );
}
