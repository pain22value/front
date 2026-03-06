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
      <AlertDialogContent className="max-w-sm gap-0 p-2">
        <AlertDialogHeader className="flex flex-col items-center justify-center p-8 space-y-4 mx-auto">
          {/* 아이콘이 있을 때만 렌더링 */}
          {icon && <div className="flex items-center justify-center mx-auto">{icon}</div>}

          <div className="text-center space-y-2">
            <AlertDialogTitle className="text-xl font-bold">{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription className="text-sm text-gray-600">{description}</AlertDialogDescription>
            )}
          </div>
        </AlertDialogHeader>

        <Separator />

        <AlertDialogFooter className="flex justify-center pt-2">
          <AlertDialogAction
            onClick={onConfirm}
            variant={"ghost"}
            className="h-16 flex-1 text-black hover:text-black font-semibold"
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
