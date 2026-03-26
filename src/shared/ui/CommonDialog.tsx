"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/shared/utils/cn";

export default function CommonDialog({
  open,
  onOpenChange,
  title,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("flex flex-col h-[80vh] w-[90%] max-w-[960px]! gap-0 p-0 overflow-hidden", className)}
      >
        <DialogHeader className="flex-none p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 pr-10">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
