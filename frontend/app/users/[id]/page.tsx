import { users } from "@/db/db-user";
import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailUserPage({ params }: Props) {
  const { id } = await params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  /* const response = await fetch(`http://localhost:4000/products/${id}`);
  const product = await response.json(); */

  return (
    <section className="space-y-4">
      <Link
        href="/users"
        className="text-sm text-slate-500 hover:text-slate-700 block"
      >
        ← User Dashboard
      </Link>
      <article className="space-y-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        {/* <Link
          href={`/users/${id}/edit`}
          className=" top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
        >
          <Pencil className="h-4 w-4" />
        </Link> */}

        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {user.name}
        </h2>
        <p className="text-sm text-slate-600">{user.email}</p>
        <ul className="text-sm font-semibold text-slate-900">
          {user.orderIds.map((order: string, index: number) => (
            <li key={index}> {order}</li>
          ))}
        </ul>
        <DeleteUserButton id={user.id} />
      </article>
    </section>
  );
}
