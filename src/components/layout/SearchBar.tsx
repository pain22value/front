"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 검색 입력 상태
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; // 한글 입력 시 엔터 두 번 방지
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative ml-auto w-[320px]">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        onClick={handleSearch}
      />
      <Input
        type="search"
        placeholder="‘킹키부츠’"
        className="pl-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
