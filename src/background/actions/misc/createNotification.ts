import browser from "webextension-polyfill";

export async function createNotification(
  data: string[],
  notification: browser.Notifications.CreateNotificationOptions
) {
  browser.notifications.create(`${Date.now().toString()}:${data.join(":")}`, notification);
}
