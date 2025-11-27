import Link from "next/link";
import { Order } from "../types/order";

export default function CardOrder(order: Order) {
  const {id, totalPrice, customer, products} = order

  return (
    <div className="relative block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:-translate-0.5 transition">
      {/* Content klickbar */}
      <Link href={`/orders/${id}`} className="block">
        <h3 className="text-sm font-semibold text-slate-500">{customer ? customer.name : "Kein Customer gefunden!"}</h3>
        <ul>
          {(products && products.length > 0) ? products.map((product) => 
         <li key={product.id}>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
         </li>
          ): "Keine Produkte gefunden!"}
        </ul>
        <p className="mt-1 text-xs text-slate-500">{totalPrice}</p>
      </Link>
    </div>
  );
}

