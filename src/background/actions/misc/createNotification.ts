import browser from "webextension-polyfill";

export async function createNotification(
  id: string,
  notification: browser.Notifications.CreateNotificationOptions
) {
  browser.notifications.create(`${Date.now().toString()}:${id}`, notification);
}
