"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();

  async function onDelete(id: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Nicht eingeloggt oder Token abgelaufen");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Fehler beim Löschen:", errorData);
        alert("Löschen fehlgeschlagen");
        return;
      }

      // Nach erfolgreichem Löschen zurück zur Startseite
      router.push("/");
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
      alert("Netzwerkfehler");
    }
  }

  return (
    <button
      type="button"
      onClick={() => onDelete(id)}
      className="inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 transition"
    >
      <Trash className="h-4 w-4 mr-2" />
      Delete
    </button>
  );
}
