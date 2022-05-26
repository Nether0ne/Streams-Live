import browser from "webextension-polyfill";
import { Platform } from "./types/general";
import { Profile } from "./types/profile";

export const t = browser.i18n.getMessage;

export function sendRuntimeMessage<T extends unknown[], V>(type: string, ...args: T): Promise<V> {
  return browser.runtime.sendMessage({ type, args });
}

export function settlePromises<T, V>(values: Iterable<T>, iteratee: (value: T) => Promise<V>) {
  return Promise.allSettled(Array.from(values, iteratee));
}

export function defaultProfileState(platform: Platform): Profile {
  return {
    id: null,
    accessToken: null,
    name: null,
    platform,
    avatar: null,
  };
}

export function getLinkForPlatform(platform: Platform, route?: string): string {
  switch (platform) {
    case "twitch":
      return `https://www.twitch.tv/${route}`;
    case "youtube":
      return `https://www.youtube.com/${route}`;
    case "goodgame":
      return `https://goodgame.ru/${route}`;
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
