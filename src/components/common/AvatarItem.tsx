import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarItem({ src, alt }: { src: string; alt?: string }) {
  return (
    <Avatar className="size-8 cursor-pointer rounded-sm">
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
