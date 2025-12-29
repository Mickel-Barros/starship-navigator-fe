import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasPrevious,
  hasNext,
  isLoading,
}: PaginationProps) {
const getVisiblePages = () => {
  const pages: (number | string)[] = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  let start = currentPage - 1;
  let end = currentPage + 1;

  if (currentPage <= 2) {
    start = 1;
    end = 3;
  }

  if (currentPage >= totalPages - 1) {
    start = totalPages - 2;
    end = totalPages;
  }

  if (start > 1) pages.push("...");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) pages.push("...");

  return pages;
};



  return (
    <div className="flex items-center justify-center gap-4 py-8 text-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious || isLoading}
        className="
                  flex items-center gap-2
                  text-white/80
                  px-4 py-2
                  rounded-lg
                  hover:bg-white/10
                  disabled:opacity-40
                "      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-3">
        {getVisiblePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                page === currentPage
                  ? "border border-muted-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="text-muted-foreground select-none"
            >
              …
            </span>
          )
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || isLoading}
        className="
          flex items-center gap-2
          text-white/80
          px-4 py-2
          rounded-lg
          hover:bg-white/10
          disabled:opacity-40
        ">
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
