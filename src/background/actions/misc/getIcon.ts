import browser from "webextension-polyfill";
import { getAllSetProfiles } from "../profiles/getAllSetupProfiles";

export async function getIconPath(size: number): Promise<string> {
  const authorized = (await getAllSetProfiles()).length > 0;
  return browser.runtime.getURL(
    `icon/${authorized ? `icon-${size}.png` : `icon-gray-${size}.png`}`
  );
}
