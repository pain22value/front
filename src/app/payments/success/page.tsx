import SuccessClient from './SuccessClient';

type Props = {
  searchParams: { paymentKey?: string; orderId?: string; amount?: string };
};

export default function Page({ searchParams }: Props) {
  return <SuccessClient searchParams={searchParams} />;
}
