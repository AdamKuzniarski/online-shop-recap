"use client";

import { users } from "@/db/db-user";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteUserButton({ id }: Props) {
  const router = useRouter();

  async function onDelete() {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    router.push("/users");
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition"
    >
      <Trash className="h-4 w-4 mr-2" />
      Delete
    </button>
  );
}
