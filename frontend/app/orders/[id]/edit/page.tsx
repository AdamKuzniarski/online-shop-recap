import EditOrderClient from "./EditOrderClient";

type Props = {
  params: { id: string };
};

export default async function EditOrderPage({ params }: Props) {
  const { id } = await params;
  return <EditOrderClient id={id} />;
}
