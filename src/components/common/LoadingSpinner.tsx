import { cn } from "@/shared/utils/cn";

export function LoadingSpinner({
  title,
  subtitle,
  fullPage = false,
  className,
}: {
  title?: string;
  subtitle?: string;
  fullPage?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center text-center",
        fullPage && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      {/* Spinner */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-border/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 animate-spin" />
      </div>

      {/* Text */}
      {title && <p className="mt-8 text-lg font-medium text-foreground">{title}</p>}
      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
