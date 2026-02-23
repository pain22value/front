import { SeatMap } from "@/features/show/ui/seat/SeatMap";

interface SeatPageProps {
  params: { showId: string };
}

export default function SeatPage({ params }: SeatPageProps) {
  return (
    <div className="h-screen">
      <SeatMap showId={Number(params.showId)} />
    </div>
  );
}