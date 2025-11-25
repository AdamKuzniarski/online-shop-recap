import Link from "next/link";
import { redirect } from "next/navigation";
import EditUserForm, { UserFormData } from "../../EditUserForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUser({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/users/${id}`);
  const user = await response.json();

  async function editUser(data: UserFormData) {
    "use server";

    await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    redirect("/users");
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Edit User
      </h2>
      <Link
        href="/users"
        className="text-slate-500 text-sm hover:text-slate-700"
      >
        ← User Dashboard
      </Link>
      <EditUserForm onSubmit={editUser} initialData={user} />
    </section>
  );
}
