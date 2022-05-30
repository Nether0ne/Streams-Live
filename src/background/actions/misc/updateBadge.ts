import { stores } from "@/common/store";
import browser from "webextension-polyfill";
import { getIconPath } from "./getIcon";

const badgeColor = "#666666";

export async function updateBadge(): Promise<void> {
  const manifest = browser.runtime.getManifest();
  const browserAction = manifest.manifest_version === 2 ? browser.browserAction : browser.action;

  const [streams, settings] = await Promise.all([stores.streams.get(), stores.settings.get()]);

  let text = "";

  if (settings.general.badge && streams.data.length > 0) {
    text = `${streams.data.length}`;
  }

  await Promise.allSettled([
    browserAction.setBadgeBackgroundColor({
      color: badgeColor,
    }),
    browserAction.setBadgeText({
      text,
    }),
    browserAction.setIcon({
      path: {
        16: await getIconPath(16),
        32: await getIconPath(32),
      },
    }),
  ]);
}
