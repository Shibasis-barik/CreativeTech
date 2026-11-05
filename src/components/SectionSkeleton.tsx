
type SkeletonVariant =
  | "hero"
  | "stats"
  | "cards"
  | "split"
  | "timeline"
  | "faq"
  | "cta";

interface SectionSkeletonProps {
  variant?: SkeletonVariant;
  tone?: "light" | "dark";
}

export default function SectionSkeleton({
  variant = "cards",
  tone = "light",
}: SectionSkeletonProps) {
  const isDark = tone === "dark";

  const block = isDark
    ? "bg-slate-700/60"
    : "bg-slate-200";

  const surface = isDark
    ? "bg-[#101820]"
    : "bg-slate-50";

  const SkeletonBlock = ({
    className = "",
  }: {
    className?: string;
  }) => (
    <div
      className={`animate-pulse rounded-lg ${block} ${className}`}
    />
  );

  return (
    <section
      aria-label="Loading section"
      aria-busy="true"
      className={`${surface} w-full overflow-hidden px-6 py-16 sm:py-20`}
    >
      <div className="mx-auto max-w-7xl">

        {variant === "hero" && (
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <SkeletonBlock className="h-4 w-36" />
              <SkeletonBlock className="h-12 w-full max-w-lg" />
              <SkeletonBlock className="h-12 w-4/5" />
              <SkeletonBlock className="h-4 w-full max-w-md" />
              <SkeletonBlock className="h-4 w-3/4" />
              <div className="flex gap-4 pt-3">
                <SkeletonBlock className="h-12 w-36 rounded-full" />
                <SkeletonBlock className="h-12 w-36 rounded-full" />
              </div>
            </div>
            <SkeletonBlock className="aspect-[4/3] w-full rounded-3xl" />
          </div>
        )}

        {variant === "stats" && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-2xl p-5">
                <SkeletonBlock className="h-9 w-24" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            ))}
          </div>
        )}

        {variant === "cards" && (
          <>
            <div className="mb-12 space-y-4 text-center">
              <SkeletonBlock className="mx-auto h-4 w-36" />
              <SkeletonBlock className="mx-auto h-9 w-2/3" />
              <SkeletonBlock className="mx-auto h-4 w-1/2" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4 rounded-2xl p-5">
                  <SkeletonBlock className="h-12 w-12 rounded-xl" />
                  <SkeletonBlock className="h-6 w-3/4" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </>
        )}

        {variant === "split" && (
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SkeletonBlock className="aspect-[4/3] w-full rounded-3xl" />
            <div className="space-y-5">
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-9 w-full" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-5/6" />
              <SkeletonBlock className="h-4 w-4/6" />
              <SkeletonBlock className="h-12 w-40 rounded-full" />
            </div>
          </div>
        )}

        {variant === "timeline" && (
          <div className="mx-auto max-w-3xl space-y-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-5">
                <SkeletonBlock className="h-12 w-12 shrink-0 rounded-full" />
                <div className="flex-1 space-y-3">
                  <SkeletonBlock className="h-5 w-1/3" />
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {variant === "faq" && (
          <div className="mx-auto max-w-4xl space-y-4">
            <SkeletonBlock className="mx-auto mb-10 h-9 w-1/2" />
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonBlock
                key={index}
                className="h-16 w-full rounded-xl"
              />
            ))}
          </div>
        )}

        {variant === "cta" && (
          <div className="mx-auto max-w-5xl space-y-6 rounded-3xl p-10 text-center">
            <SkeletonBlock className="mx-auto h-4 w-32" />
            <SkeletonBlock className="mx-auto h-10 w-2/3" />
            <SkeletonBlock className="mx-auto h-4 w-3/4" />
            <SkeletonBlock className="mx-auto h-12 w-40 rounded-full" />
          </div>
        )}

      </div>
    </section>
  );
}
