import Link from "next/link";
import Form from "../components/Form";

export default function CreateProduct() {
  return (
    <>
      <h2>Add Product</h2>
      <Link href="/">← Home</Link>
      <Form />
    </>
  );
}
