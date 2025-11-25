import { users  } from "@/db/db-user";
import { User } from "../types/user";
import CardUser from "../components/CardUser";
import Link from "next/link";


export default function UserPage() {
  

  

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800">
            User Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Manage users and see details.
          </p>
          <Link
            href="/create-user"
            className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 transition"
          >
            + User
          </Link>
        </div>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-slate-600">
        {users.map((user: User) => {
          return (
            <li key={user.id}>
              <CardUser
                id={user.id}
                name={user.name}
                email={user.email}
                orderIds={user.orderIds}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
