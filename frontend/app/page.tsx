import { products } from "@/db/db";
import Card from "./components/Card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Card
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            </li>
          );
        })}
      </ul>
      <Link href="/create">+ Product</Link>
    </>
  );
}
