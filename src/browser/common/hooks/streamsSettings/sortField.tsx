import { stores } from "@/common/store";
import { SortField } from "@/common/types/settings";
import { useStore } from "../store";

export function useSortField() {
  const [settings, store] = useStore(stores.settings);
  const { sortField } = settings.stream;

  const setSortField = (field: SortField) => {
    store.set({ ...settings, stream: { ...settings.stream, sortField: field } });
  };

  return { sortField, setSortField };
}
