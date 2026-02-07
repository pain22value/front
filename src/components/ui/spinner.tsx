import { Loader2Icon } from "lucide-react";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />;
}

function LoaderSpinner({ className, ...props }: React.ComponentProps<"svg">) {
  return <LoaderIcon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />;
}

export { Spinner, LoaderSpinner };
