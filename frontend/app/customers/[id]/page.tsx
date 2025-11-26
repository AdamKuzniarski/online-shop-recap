import Link from "next/link";
import DeleteUserButton from "./DeleteCustomerButton";
import { Pencil } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailCustomerPage({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/api/customers/${id}`);
  const customer = await response.json();

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <section className="space-y-4">
      <Link
        href="/customers"
        className="text-sm text-slate-500 hover:text-slate-700 block"
      >
        ← Customer Overview
      </Link>
      <article className="space-y-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <Link
          href={`/customers/${id}/edit`}
          className=" top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
        >
          <Pencil className="h-4 w-4" />
        </Link>{" "}
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {customer.name}
        </h2>
        <p className="text-sm text-slate-600">{customer.email}</p>
        <DeleteUserButton id={customer.id} />
      </article>
    </section>
  );
}
