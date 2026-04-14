import ArtistMembershipSubscribe from "@/features/artists/ui/membership/ArtistMembershipSubscribe";

type Params = Promise<{ artistId: string }>;
type SearchParams = Promise<{ success?: string; paymentKey?: string; orderId?: string; amount?: string }>;

export default async function ArtistMembershipPage(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return (
    <main className="artist-membership-page">
      <section>
        <ArtistMembershipSubscribe artistId={params.artistId} searchParams={searchParams} />
      </section>
    </main>
  );
}
