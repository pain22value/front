import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="p-4 shadow-lg border-border flex flex-col justify-center">
      <CardContent className="p-0">
        <p className="text-muted-foreground text-sm font-medium mb-3">{title}</p>
        <p className="text-xl font-extrabold tracking-tight text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
