import { useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  return { search, setSearch: (value: string) => setSearch(value) };
}
