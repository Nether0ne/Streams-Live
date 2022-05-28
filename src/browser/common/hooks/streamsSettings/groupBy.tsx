import { stores } from "@/common/store";
import { GroupBy } from "@/common/types/settings";
import { useStore } from "../store";

export function useGroupBy() {
  const [settings, store] = useStore(stores.settings);
  const { groupBy } = settings.stream;

  const setGroupBy = (group: GroupBy) => {
    store.set({ ...settings, stream: { ...settings.stream, groupBy: group } });
  };

  return { groupBy, setGroupBy };
}
