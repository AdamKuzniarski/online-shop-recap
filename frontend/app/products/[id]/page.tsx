import { products } from "@/db/db";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function DetailPage({ params }: Props) {
  const { id } = await params;

  const currentIndex = products.findIndex((product) => product.id === id);

  if (currentIndex === -1) {
    return <p>Product not found</p>;
  }

  const product = products[currentIndex];

  return (
    <>
      <Link href="/">← Home</Link>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price},-</p>
    </>
  );
}
