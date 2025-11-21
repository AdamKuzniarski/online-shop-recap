"use client";

import Link from "next/link";
import Form, { ProductsFormData } from "../components/Form";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

  function addProduct(data: ProductsFormData) {
    console.log("adding Product");
    console.log("Data", data);
    router.push("/");
  }
  return (
    <>
      <h2>Add Product</h2>
      <Link href="/">← Home</Link>
      <Form onSubmit={addProduct} />
    </>
  );
}
