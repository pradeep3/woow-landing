import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-[76rem]",
        size === "wide" && "max-w-[90rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
