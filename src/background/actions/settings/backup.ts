import { stores, StoreState } from "@/common/store";
import { Dictionary } from "lodash";

export async function backup(): Promise<Dictionary<StoreState<unknown>>> {
  const settings = await stores.settings.getState();

  return { settings };
}
