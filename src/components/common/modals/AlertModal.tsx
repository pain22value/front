"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

export default function AlertModal({
  open,
  icon,
  title,
  description,
  confirmText = "확인",
  onConfirm,
}: {
  open: boolean;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => void;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-sm gap-0 p-2 border-none shadow-2xl bg-white dark:bg-zinc-900">
        <AlertDialogHeader className="flex flex-col items-center justify-center p-8 space-y-4 mx-auto">
          {/* 아이콘이 있을 때만 렌더링 */}
          {icon && <div className="flex items-center justify-center mx-auto">{icon}</div>}

          <div className="text-center space-y-2">
            <AlertDialogTitle className="text-xl font-bold text-zinc-950 dark:text-zinc-50">{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </AlertDialogDescription>
            )}
          </div>
        </AlertDialogHeader>

        <Separator className="bg-zinc-100 dark:bg-zinc-800" />

        <AlertDialogFooter className="flex justify-center pt-2 bg-white dark:bg-zinc-900">
          <AlertDialogAction
            onClick={onConfirm}
            variant={"ghost"}
            className="h-16 flex-1 text-zinc-950 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold border-none"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// "use client";

// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { Separator } from "@/components/ui/separator";

// export default function AlertModal({
//   open,
//   message,
//   onConfirm,
//   confirmText = "확인",
// }: {
//   open: boolean;
//   message: string;
//   onConfirm?: () => void;
//   confirmText?: string;
// }) {
//   return (
//     <AlertDialog open={open}>
//       <AlertDialogContent className="max-w-sm! gap-0 p-2">
//         <AlertDialogHeader className="min-h-52 flex flex-col items-center! justify-center p-6">
//           <AlertDialogTitle>{message}</AlertDialogTitle>
//         </AlertDialogHeader>
//         <Separator />
//         <AlertDialogFooter className="flex justify-center! pt-2">
//           <AlertDialogAction
//             onClick={onConfirm}
//             variant={"ghost"}
//             className="h-16 flex-1 text-red-500 hover:text-red-500"
//           >
//             {confirmText}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
