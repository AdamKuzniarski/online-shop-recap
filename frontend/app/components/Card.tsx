export default function Card({ name, description, price }) {
  return (
    <div>
      <p>{name} </p>
      <p>{description}</p>
      <p>{price},-</p>
    </div>
  );
}
