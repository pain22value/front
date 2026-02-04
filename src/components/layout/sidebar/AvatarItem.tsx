import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarItemProps {
  src: string;
  alt?: string;
}

export function AvatarItem({ src, alt }: AvatarItemProps) {
  return (
    <Avatar className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
