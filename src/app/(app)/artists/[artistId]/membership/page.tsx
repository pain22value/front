import ArtistMembershipSubscribe from "@/features/artists/ui/membership/ArtistMembershipSubscribe";

type Params = Promise<{ artistId: string }>;

export default async function ArtistMembershipPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <main className="artist-membership-page">
      <section className="transition-colors">
        <ArtistMembershipSubscribe artistId={params.artistId} />
      </section>
    </main>
  );
}
