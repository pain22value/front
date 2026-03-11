import ActorSection from "@/features/actors/ui/detail/ActorSection";

type Params = Promise<{ actorId: string }>;

export default async function ActorPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <section>
      <ActorSection actorId={params.actorId} />
    </section>
  );
}
