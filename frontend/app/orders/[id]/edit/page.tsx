import EditCustomerClient from "./EditCustomerClient";

type Props = {
  params: { id: string };
};

export default async function EditCustomerPage({ params }: Props) {
  const { id } = await params;
  return <EditCustomerClient id={id} />;
}
