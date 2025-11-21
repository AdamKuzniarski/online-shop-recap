import Link from "next/link";
import { Product } from "../types/product";

export default function Card({ id, name }: Product) {
  return (
    <div>
      <Link href={`/products/${id}`}>
        <p>{name} </p>
      </Link>
    </div>
  );
}
