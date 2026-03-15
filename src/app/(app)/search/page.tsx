import SearchResultSection from "@/features/search/ui/SearchResultSection";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;

  return (
    <section className="pl-20">
      <SearchResultSection query={query as string} />
    </section>
  );
}
