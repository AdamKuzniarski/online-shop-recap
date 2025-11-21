"use client";

import Link from "next/link";
import Form, { ProductsFormData } from "../components/Form";
import { useRouter } from "next/navigation";

async function createProduct(newProduct: ProductsFormData) {
  const response = await fetch("http://localhost:4000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  const data = await response.json();
  console.log("Product created:", data);
}

export default function CreateProduct() {
  const router = useRouter();

  async function addProduct(data: ProductsFormData) {
    console.log("adding Product");
    console.log("Data", data);
    await createProduct(data);
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
