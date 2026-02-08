import Image from "next/image";
import { Card } from "@/components/ui/card";

const casts = [
  { name: "강홍석", image: "/images/cast1.jpg" },
  { name: "정성화", image: "/images/cast2.jpg" },
  { name: "박은태", image: "/images/cast3.jpg" },
];

export function ShowCastSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">캐스팅</h2>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {casts.map((cast) => (
          <Card key={cast.name} className="p-3 text-center">
            <Image src={cast.image} alt={cast.name} width={96} height={96} className="mx-auto rounded-full" />
            <p className="mt-2 text-sm font-medium">{cast.name}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
