import { Loader2, Pill } from "lucide-react";
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
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      {variant === "branded" ? (
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center animate-pulse">
            <Pill className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 h-16 w-16 rounded-2xl border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
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
