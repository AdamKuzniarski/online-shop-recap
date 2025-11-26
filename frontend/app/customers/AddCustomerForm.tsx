export type CustomerFormData = {
  name: string;
  email: string;
};

type FormProps = {
  onSubmit: (data: CustomerFormData) => void;
};

export default function AddCustomerForm({ onSubmit }: FormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData);
    
    const data: CustomerFormData = {
      name: raw.name as string,
      email: raw.email as string,
    };

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
          id="email"
          name="email"
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition"
      >
        Add
      </button>
    </form>
  );
}
