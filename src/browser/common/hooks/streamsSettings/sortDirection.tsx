import { stores } from "@common/store";
import { SortDirection } from "@customTypes/settings";
import { useStore } from "@hooks/store";

export function useSortDirection() {
  const [settings, store] = useStore(stores.settings);
  const { sortDirection } = settings.stream;

  const setSortDirection = (direction: SortDirection) => {
    store.set({ ...settings, stream: { ...settings.stream, sortDirection: direction } });
  };

  return { sortDirection, setSortDirection };
}
