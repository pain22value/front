import Search from "@/features/show/search/Search";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;

  return (
    <section className="pl-20">
      <Search query={query as string} />
    </section>
  );
}
