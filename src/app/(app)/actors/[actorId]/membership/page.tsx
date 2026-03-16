import ActorMembershipSubscribeSection from "@/features/actors/ui/membership/ActorMembershipSubscribeSection";

type Params = Promise<{ actorId: string }>;

export default async function ActorMembershipPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <section className="min-h-screen py-12 px-4 transition-colors">
      <ActorMembershipSubscribeSection actorId={params.actorId} />
    </section>
  );
}
