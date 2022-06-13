import { stores } from "@/common/store";
import { useStore } from "./store";

export default function useSettings() {
  return useStore(stores.settings);
}
