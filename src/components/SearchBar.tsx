import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { sanitizeSafe } from "@/lib/sanitize";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search" }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeSafe(e.target.value, 100);
    onChange(sanitized);
  };

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          pl-10
          bg-muted
          border-border
          rounded-lg
          h-10
          focus:outline-none
          focus:ring-0
          focus:border-border
          focus-visible:ring-0
        "
      />
    </div>
  );
}
