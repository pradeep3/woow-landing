import { cn } from "@/lib/cn";

/**
 * Static stand-in for the WebGL field. Shown while the scene chunk loads and
 * while the WebGL context is created, and left in place permanently if WebGL
 * is unavailable or fails. Pure CSS — no image request, no layout shift, and
 * it never blocks first paint.
 *
 * It mirrors the composition of the live scene: a quiet dot field with a warm
 * focal bloom at centre-right, where the headline's positive space ends.
 */
export function HeroPoster({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div className="dot-field dot-field-fade absolute inset-0 opacity-70" />

      {/* focal signal source */}
      <div
        className="absolute top-1/2 left-[68%] size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft) 0%, transparent 62%)",
        }}
      />
      <div
        className="absolute top-1/2 left-[68%] size-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)",
        }}
      />

      {/* horizon grade, so the field reads as a receding plane */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, var(--bg) 4%, transparent 100%)",
        }}
      />
    </div>
  );
}
