import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-4 order-2 md:order-1">
              <Skeleton className="h-6 w-3/4 mb-2 bg-secondary" />
              <Skeleton className="h-4 w-1/2 mb-3 bg-secondary" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4 bg-secondary" />
                ))}
              </div>
              <Skeleton className="h-4 w-32 bg-secondary" />
            </div>
            <div className="w-full md:w-36 h-32 order-1 md:order-2">
              <Skeleton className="w-full h-full bg-secondary rounded-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
