import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="p-4 shadow-lg border-gray-100 flex flex-col justify-center">
      <CardContent className="p-0">
        <p className="text-gray-400 text-sm font-medium mb-3">{title}</p>
        <p className="text-xl font-extrabold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
