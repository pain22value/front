"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

export default function AlertModal({
  open,
  message,
  onConfirm,
  confirmText = "확인",
}: {
  open: boolean;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-sm! gap-0 p-2">
        <AlertDialogHeader className="min-h-52 flex flex-col items-center! justify-center p-6">
          <AlertDialogTitle>{message}</AlertDialogTitle>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="flex justify-center! pt-2">
          <AlertDialogAction
            onClick={onConfirm}
            variant={"ghost"}
            className="h-16 flex-1 text-red-500 hover:text-red-500"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
