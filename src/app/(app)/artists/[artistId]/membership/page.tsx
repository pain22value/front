import ArtistMembershipSubscribeSection from "@/features/artists/ui/membership/ArtistMembershipSubscribeSection";

type Params = Promise<{ artistId: string }>;

export default async function ArtistMembershipPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <section className="pl-20 min-h-screen py-12 px-4 transition-colors">
      <ArtistMembershipSubscribeSection artistId={params.artistId} />
    </section>
  );
}
