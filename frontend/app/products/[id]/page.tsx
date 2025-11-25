import DetailPageComponent from "./ProductClient"

type Props = {
  params: { id: string };
};

export default async function DetailPage({ params }: Props) {
  const { id } = await params;

return <DetailPageComponent id={id}/>
}




