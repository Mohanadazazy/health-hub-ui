import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  className?: string;
  variant?: "spinner" | "branded";
}

const Loading = ({
  fullScreen = false,
  message = "Loading...",
  className,
  variant = "branded",
}: LoadingProps) => {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4 text-center", className)}>
      {variant === "branded" ? (
        <div className="h-16 w-16 rounded-2xl border-2 border-primary/30 border-t-primary animate-spin" />
      ) : (
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      )}
      {message && (
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;

