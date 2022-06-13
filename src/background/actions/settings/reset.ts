import browser from "webextension-polyfill";
import { setup } from "./setup";

export async function reset(): Promise<void> {
  await Promise.allSettled([
    browser.storage.local.clear(),
    browser.storage.managed.clear(),
    browser.storage.sync.clear(),
  ]);

  await setup(true);
  browser.runtime.reload();
}
