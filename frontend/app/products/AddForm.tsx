export type ProductsFormData = {
  name: string;
  description: string;
  price: number;
};

type FormProps = {
  onSubmit: (data: ProductsFormData) => void;
};

export default function Form({ onSubmit }: FormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData);

    const data: ProductsFormData = {
      name: raw.name as string,
      description: raw.description as string,
      price: Number(parseFloat(raw.price as string).toFixed(2)), // <-- wichtig
    };

    onSubmit(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 bg-white p-6 shadow-sm ring-1 ring-slate-100"
    >
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
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700"
        >
          Description
        </label>
        <input
          type="text"
          required
          id="description"
          name="description"
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-slate-700"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          inputMode="decimal"
          pattern="[0-9]+([.,][0-9]{1,2})?"
          required
          className="w-full text-black rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
