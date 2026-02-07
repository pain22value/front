import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarItemProps {
  src: string;
  alt?: string;
}

export function AvatarItem({ src, alt }: AvatarItemProps) {
  return (
    <Avatar
      className="size-8 cursor-pointer 
      rounded-sm
      "
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
