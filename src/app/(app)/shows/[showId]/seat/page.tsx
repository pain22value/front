import { SeatMap } from "@/features/show/ui/seat/SeatMap";

interface SeatPageProps {
  params: Promise<{ showId: string }>;
}

export default async function SeatPage({ params }: SeatPageProps) {
  const { showId } = await params;
  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <SeatMap showScheduleId={Number(showId)} />
    </div>
  );
}