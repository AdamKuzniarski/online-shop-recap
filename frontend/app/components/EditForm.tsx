"use client";

export type ProductsFormData = {
  name: string;
  description: string;
  price: number;
};

type FormProps = {
  onSubmit: (data: ProductsFormData) => void;
  initialData?: ProductsFormData;
};

export default function EditForm({ onSubmit, initialData }: FormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const raw = Object.fromEntries(formData);

    const data = raw as unknown as ProductsFormData;
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
          defaultValue={initialData?.name}
          required
          id="name"
          name="name"
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium  text-slate-700"
        >
          Description
        </label>
        <input
          type="text"
          required
          defaultValue={initialData?.description}
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
          type="number"
          defaultValue={initialData?.price}
          required
          id="price"
          name="price"
          className="w-full rounded-xl border text-black border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition"
      >
        Add
        {initialData ? "Update" : "Add"}
      </button>
    </form>
  );
}
