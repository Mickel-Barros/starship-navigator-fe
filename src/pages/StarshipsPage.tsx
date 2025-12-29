import { useState, useMemo } from "react";
import { useStarships } from "@/hooks/useStarships";
import { Header, PageTitle } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StarshipCard } from "@/components/StarshipCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { MobileNav } from "@/components/MobileNav";
import { Pagination } from "@/components/Pagination";

const ITEMS_PER_PAGE = 10;

export default function StarshipsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, error } = useStarships();

const filteredStarships = useMemo(() => {
  const starships = data;

  if (!starships) return [];
  if (!searchQuery.trim()) return starships;

  return starships.filter(
    (starship) =>
      starship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      starship.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [data, searchQuery]);


  const totalPages = Math.ceil(filteredStarships.length / ITEMS_PER_PAGE);

  const paginatedStarships = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredStarships.slice(start, end);
  }, [filteredStarships, currentPage]);

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />

      <main className="flex-1 container py-4 md:py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <PageTitle title="Starship List" />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search"
          />
        </div>

        {isLoading && <LoadingSkeleton />}

        {isError && (
          <EmptyState
            type="error"
            message={error?.message || "Failed to load starships"}
          />
        )}

        {!isLoading && data && (
          <>
            {paginatedStarships.length === 0 ? (
              <EmptyState
                type="no-results"
                message="No starships found matching your search."
              />
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {paginatedStarships.map((starship, index) => (
                  <StarshipCard
                    key={starship.url}
                    starship={starship}
                    index={index}
                  />
                ))}
              </div>
            )}
            {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    hasPrevious={currentPage > 1}
                    hasNext={currentPage < totalPages}
                    isLoading={isLoading}
                  />
                )}
          </>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
