import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarItemProps {
  src: string;
  alt?: string;
}

export function AvatarItem({ src, alt }: AvatarItemProps) {
  return (
    <Avatar
      className="h-12 w-12 cursor-pointer 
      rounded-[1px]!
      hover:ring-2 hover:ring-primary transition"
    >
      <AvatarImage src={src} alt={alt} className="rounded-[1px]!" />
      <AvatarFallback className="rounded-[1px]!">U</AvatarFallback>
    </Avatar>
  );
}
