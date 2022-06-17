import { stores } from "@common/store";
import { SortField } from "@customTypes/settings";
import { useStore } from "@hooks/store";

export function useSortField() {
  const [settings, store] = useStore(stores.settings);
  const { sortField } = settings.stream;

  const setSortField = (field: SortField) => {
    store.set({ ...settings, stream: { ...settings.stream, sortField: field } });
  };

  return { sortField, setSortField };
}
