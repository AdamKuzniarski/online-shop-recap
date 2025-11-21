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

    const data = raw as unknown as ProductsFormData;
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" required id="name" name="name" />
      <label htmlFor="description">Description</label>
      <input type="text" required id="description" name="description" />
      <label htmlFor="description">Price</label>
      <input type="number" required id="price" name="price" />
      <button type="submit">Add</button>
    </form>
  );
}
