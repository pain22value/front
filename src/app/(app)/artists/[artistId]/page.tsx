import ArtistSection from "@/features/artists/ui/ArtistSection";

type Params = Promise<{ artistId: string }>;

export default async function ArtistPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <section>
      <ArtistSection artistId={params.artistId} />
    </section>
  );
}
