import { SeatMap } from "@/features/show/ui/seat/SeatMap";

interface SeatPageProps {
  params: { showId: string };
}

export default function SeatPage({ params }: SeatPageProps) {
  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <SeatMap showId={Number(params.showId)} />
    </div>
  );
}