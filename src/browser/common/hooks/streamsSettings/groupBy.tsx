import { stores } from "@common/store";
import { GroupBy } from "@customTypes/settings";
import { useStore } from "@hooks/store";

export function useGroupBy() {
  const [settings, store] = useStore(stores.settings);
  const { groupBy } = settings.stream;

  const setGroupBy = (group: GroupBy) => {
    store.set({ ...settings, stream: { ...settings.stream, groupBy: group } });
  };

  return { groupBy, setGroupBy };
}
