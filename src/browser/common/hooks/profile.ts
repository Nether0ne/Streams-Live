import { stores } from "@/common/store";
import { Platform } from "@/common/types/general";
import { get } from "lodash-es";
import { useStore } from "./store";

export function useProfile(platform: Platform) {
  return useStore(get(stores, `${platform}Profile`));
}
