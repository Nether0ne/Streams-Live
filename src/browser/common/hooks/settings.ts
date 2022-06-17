import { stores } from "@common/store";
import { useStore } from "@hooks/store";

export default function useSettings() {
  return useStore(stores.settings);
}
