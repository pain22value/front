import SuccessClient from './SuccessClient';

type Props = {
  searchParams: Promise<{ paymentKey?: string; orderId?: string; amount?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const resolved = await searchParams;
  return <SuccessClient searchParams={resolved} />;
}
