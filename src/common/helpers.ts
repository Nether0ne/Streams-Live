import { castArray } from "lodash-es";
import browser from "webextension-polyfill";
import { Dictionary, LinkType } from "./types/general";
import { Platform, PlatformName, PlatformType } from "./types/platform";

export const t = browser.i18n.getMessage;

export function sendRuntimeMessage<T extends unknown[], V>(type: string, ...args: T): Promise<V> {
  return browser.runtime.sendMessage({ type, args });
}

export function defaultPlatformState(name: PlatformName, type: PlatformType): Platform {
  return {
    name,
    enabled: false,
    type,
    data: type === PlatformType.AUTH ? { id: null, name: null, avatar: null } : null,
    followedStreamers: [],
  };
}

export function getLinkForPlatform(
  platform: PlatformName,
  route?: string,
  type?: LinkType
): string {
  switch (platform) {
    case PlatformName.TWITCH:
      return `https://www.twitch.tv/${route}`;
    case PlatformName.GOODGAME:
      return `https://goodgame.ru/${type === LinkType.STREAM ? "channel/" : ""}${route}`;
    // TODO: Add more platforms
    // case PlatformName.WASD:
    //   return `https://wasd.tv/${type === LinkType.STREAM ? "channel/" : ""}${route}`;
    default:
      throw new RangeError();
  }
}

export function timeBetweenDates(startDate: Date, endDate: Date) {
  const diff = endDate.getTime() - startDate.getTime();
  const days = formatDigit(Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = formatDigit(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = formatDigit(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), false);
  const seconds = formatDigit(Math.floor((diff % (1000 * 60)) / 1000), false);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function formatDigit(digit: number, cutZeros = true) {
  return digit == 0 && cutZeros ? "" : digit < 10 ? `0${digit}` : `${digit}`;
}

export function digitWithSpaces(digit: number) {
  return digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function objectToUrlParams(obj: Dictionary<any> = {}): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const [name, value] of Object.entries(obj ?? {})) {
    for (const v of castArray(value)) {
      if (typeof v === "undefined") {
        continue;
      }

      searchParams.append(name, v.toString());
    }
  }

  return searchParams;
}
