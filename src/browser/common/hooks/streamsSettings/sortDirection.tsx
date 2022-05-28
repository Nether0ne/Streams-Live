import { stores } from "@/common/store";
import { SortDirection } from "@/common/types/settings";
import { useStore } from "../store";

export function useSortDirection() {
  const [settings, store] = useStore(stores.settings);
  const { sortDirection } = settings.stream;

  const setSortDirection = (direction: SortDirection) => {
    store.set({ ...settings, stream: { ...settings.stream, sortDirection: direction } });
  };

  return { sortDirection, setSortDirection };
}
