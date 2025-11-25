import EditCustomerClient from "./EditCustomerClient";

type Props = {
  params: { id: string };
};

export default function EditCustomerPage({ params }: Props) {
  const { id } = params;
  return <EditCustomerClient id={id} />;
}
