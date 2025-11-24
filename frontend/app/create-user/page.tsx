"use client";

import { users } from "@/db/db-user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddUserForm from "../users/AddUserForm";

export default function CreateUser() {
  const router = useRouter();

  async function addUser(data: any) {
    users.push(data);
    console.log(users);
    router.push("/users");
  }
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between"></header>
      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
        Add User
      </h2>
      <Link
        href="/users"
        className="text-slate-500 text-sm hover:text-slate-700"
      >
        ← User Dashboard
      </Link>
      <AddUserForm onSubmit={addUser} />
    </section>
  );
}
