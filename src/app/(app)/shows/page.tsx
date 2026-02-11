import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { shows } from "@/shared/data/shows";
import Image from "next/image";
import Link from "next/link";

export default function ShowListPage() {
  return (
    <section className="pl-20">
      <div className="space-y-6 px-10">
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-[140]">
              <SelectValue placeholder="정렬 순" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">인기순</SelectItem>
              <SelectItem value="latest">최신순</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140]">
              <SelectValue placeholder="지역 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seoul">서울</SelectItem>
              <SelectItem value="busan">부산</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-8 xs:grid-cols-12 sm:grid-cols-16 md:grid-cols-20 lg:grid-cols-24 gap-2 md:gap-3 lg:gap-4 border border-dashed">
          {shows.map((show) => (
            <Link href={`/shows/${show.id}`} key={show.id} className="col-span-4">
              <Image src={show.image} alt={show.title} width={500} height={500} className="object-cover aspect-3/4" />
              <div className="p-2 space-y-1">
                <h3 className="text-sm font-semibold truncate">{show.title}</h3>
                <small>{show.venue}</small>
                <p className="text-xs">{show.period}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
