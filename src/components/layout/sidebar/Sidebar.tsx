import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import { AvatarItem } from "./AvatarItem";

const users = ["/images/user1.jpg", "/images/user2.jpg", "/images/user3.jpg", "/images/user4.jpg"];

export function Test() {
  return (
    <aside className="flex h-screen/ w-20 flex-col items-center gap-4 border-r border-dashed bg-background py-4">
      {/* Top */}
      <div className="flex flex-col items-center gap-4">
        <Button size="icon" variant="outline" className="rounded-xl">
          <Plus />
        </Button>

        <div className="mt-2 flex flex-col gap-4">
          {users.map((src, i) => (
            <AvatarItem key={i} src={src} />
          ))}
        </div>
      </div>

      {/* Bottom */}
      <Button size="icon" variant="ghost">
        <MessageSquare />
      </Button>
    </aside>
  );
}
