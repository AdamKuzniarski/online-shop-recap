import EditProductClient from "./EditProductClient";

type Props = {
  params: { id: string };
};

export default async function EditProduct({ params }: Props) {
  const { id } = await params;

  return <EditProductClient id={id} />;
}
