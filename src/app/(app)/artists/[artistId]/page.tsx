import ArtistDetail from "@/features/artists/ui/ArtistDetail";

type Params = Promise<{ artistId: string }>;

export default async function ArtistDetailPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <main className="artist-detail-page">
      <ArtistDetail artistId={params.artistId} />
    </main>
  );
}
