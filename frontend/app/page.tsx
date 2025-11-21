import { products } from "@/db/db";
import Card from "./components/Card";

export default function Home() {
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Card
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </li>
        );
      })}
    </ul>
  );
}
