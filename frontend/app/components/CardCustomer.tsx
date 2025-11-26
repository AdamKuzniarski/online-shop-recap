import Link from "next/link";
import { Customer } from "../types/customer";

export default function CardCustomer({ id, name, email }: Customer) {
  return (
    <div className="relative block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:-translate-0.5 transition">
      {/* Content klickbar */}
      <Link href={`/customers/${id}`} className="block">
        <h3 className="text-sm font-semibold text-slate-500">{name}</h3>
        <p className="mt-1 text-xs text-slate-500">{email}</p>
      </Link>
    </div>
  );
}
