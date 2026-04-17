"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "확인",
  onOpenChange,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] sm:max-w-md gap-0 p-2 overflow-hidden border-none shadow-2xl bg-white dark:bg-zinc-900">
        <DialogHeader className="px-6 py-16 flex flex-col items-center gap-2">
          <DialogTitle className="text-center text-zinc-950 dark:text-zinc-50">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center mt-4 text-zinc-500 dark:text-zinc-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <Separator className="bg-zinc-100 dark:bg-zinc-800" />
        <DialogFooter className="grid grid-cols-2 gap-2 pt-2 bg-white dark:bg-zinc-900">
          <Button
            variant="ghost"
            className="h-16 rounded-md text-base text-zinc-950 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button className="h-16 rounded-md text-base bg-[#FF474D] hover:bg-[#EB3D43] text-white" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
