export type UserFormData = {
  name: string;
  email: string;
  orderIds: string[];
};

type FormProps = {
  onSubmit: (data: UserFormData) => void;
};

export default function EditUserForm({ onSubmit, initialData }: FormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData);

    const data = raw as unknown as UserFormData;
    onSubmit(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 bg-white p-6 shadow-sm ring-1 ring-slate-100"
    >
      {/* Name */}
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <input
          type="text"
          required
          defaultValue={initialData?.name}
          id="name"
          name="name"
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          type="email"
          required
          defaultValue={initialData?.email}
          id="email"
          name="email"
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      {/* Order IDs */}
      <div className="space-y-1">
        <label
          htmlFor="orderIds"
          className="block text-sm font-medium text-slate-700"
        >
          Order IDs (eine pro Zeile)
        </label>
        <textarea
          id="orderIds"
          name="orderIds"
          defaultValue={initialData?.orderIds}
          rows={4}
          placeholder="z. B. 123-abc-334&#10;987-xyz-554"
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition"
      >
        {initialData ? "Update" : "Add"}
      </button>
    </form>
  );
}
