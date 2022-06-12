import browser from "webextension-polyfill";

export async function backup(): Promise<Dictionary<StoreState<unknown>>> {
  const settings = await stores.settings.getState();

  return { settings };
}

export async function reset(): Promise<void> {
  await Promise.allSettled([
    browser.storage.local.clear(),
    browser.storage.managed.clear(),
    browser.storage.sync.clear(),
  ]);

  await setup(true);
  browser.runtime.reload();
}
import { Store, stores, StoreState } from "@/common/store";
import { Dictionary } from "@/common/types/general";
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

export async function setup(migrate = false): Promise<void> {
  const allStores = Object.values(stores);
  const promises = allStores.map((store) => store.setup(migrate));
  await Promise.allSettled(promises);
}
