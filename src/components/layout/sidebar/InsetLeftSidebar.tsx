import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AvatarItem } from "./AvatarItem";
import { Separator } from "@/components/ui/separator";
import { avatars } from "@/shared/data/avatars";

export function InsetLeftSidebar() {
  return (
    <aside
      className="z-30 
      sticky/ fixed top-(--header-height) h-[calc(100svh-var(--header-height))] 
      flex w-20 flex-col items-center gap-4 border-r border-dashed bg-background/ py-4"
    >
      {/* Top */}
      <div className="flex flex-col items-center gap-4">
        <Button size="icon" variant="outline" className="rounded-xl">
          <Plus />
        </Button>

        <div className="mt-2 flex flex-col gap-4">
          {avatars.map((avatar) => (
            <AvatarItem key={avatar.id} src={avatar.image} alt={avatar.name} />
          ))}
        </div>
      </div>

      <div className="w-8">
        <Separator className="bg-gray-500/ bg-muted-foreground" />
      </div>

      {/* Bottom */}
      <Button size="icon" variant={"ghost"}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 6C17.103 6 18 6.897 18 8V16C18 17.103 17.103 18 16 18H11.1006L6 22.0811V18H4C2.897 18 2 17.103 2 16V8C2 6.897 2.897 6 4 6H16ZM20 2C21.103 2 22 2.897 22 4V12C22 13.103 21.103 14 20 14V6C20 4.897 19.103 4 18 4H6C6 2.897 6.897 2 8 2H20Z"
            fill="#626262"
          />
        </svg>
      </Button>
    </aside>
  );
}
