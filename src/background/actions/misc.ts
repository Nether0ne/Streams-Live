import browser from "webextension-polyfill";
import { stores } from "@/common/store";
import { getAllSetPlatforms } from "./platform";

const badgeColor = "#666666";

export async function updateBadge(): Promise<void> {
  const manifest = getManifestVersion();
  const browserAction = manifest === 2 ? browser.browserAction : browser.action;

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

export function getManifestVersion(): number {
  return browser.runtime.getManifest().manifest_version;
}

export async function createNotification(
  data: string[],
  notification: browser.Notifications.CreateNotificationOptions
) {
  const manifest = getManifestVersion();

  if (manifest === 2) {
    notification.message = `${notification.message}\n\n${notification.contextMessage}`;
  }

  browser.notifications.create(`${Date.now().toString()}:${data.join(":")}`, notification);
}

export async function getIconPath(size: number): Promise<string> {
  const authorized = (await getAllSetPlatforms()).length > 0;
  return browser.runtime.getURL(
    `icon/${authorized ? `icon-${size}.png` : `icon-gray-${size}.png`}`
  );
}
