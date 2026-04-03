import Image from "next/image";
import Link from "next/link";

export default function ShowCard({ show }: { show: SearchShow }) {
  return (
    <Link href={`/shows/${show.showId}`} className="block group">
      <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden mb-4 bg-muted transition-all">
        {show.posterUrl && (
          <Image
            src={show.posterUrl}
            alt={show.title}
            width={300}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <p className="font-semibold group-hover:underline text-base text-slate-900 dark:text-slate-100">
        {show.title}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{show.venueName}</p>
      <p className="text-sm text-muted-foreground">{show.date}</p>
    </Link>
  );
}
