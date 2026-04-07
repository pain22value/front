import ArtistDetailTabs from "@/features/artists/ui/ArtistDetailTabs";
import ArtistHero from "@/features/artists/ui/ArtistHero";
import ArtistSide from "@/features/artists/ui/ArtistSide";

type Params = Promise<{ artistId: string }>;

export default async function ArtistDetailPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <main className="artist-detail-page">
      <ArtistHero artistId={params.artistId} />
      <section>
        <section className="grid grid-cols-[minmax(550px,1fr)_400px] gap-6 py-10">
          <ArtistDetailTabs artistId={params.artistId} />
          {/* <div className="h-[3000px] bg-black"></div> */}
          <section className="self-start sticky top-[calc(var(--header-height)+2.5rem)]">
            <ArtistSide artistId={params.artistId} />
          </section>
        </section>
      </section>
    </main>
  );
}
