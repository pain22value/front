import SearchResult from "@/features/search/ui/SearchResult";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;

  return (
    <main className="search-page">
      <section>
        <SearchResult query={query as string} />
      </section>
    </main>
  );
}
