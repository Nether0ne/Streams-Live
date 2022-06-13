import { Store, stores, StoreState } from "@/common/store";
import { Settings } from "@/common/types/settings";
import { get } from "lodash-es";

export async function restore(data: StoreState<Settings>): Promise<void> {
  const restoreStore = async (store: Store<any>) => {
    const state = get(data, store.name);

    if (state) {
      await store.restore(state);
    }
  };

  await restoreStore(stores.settings);
}
