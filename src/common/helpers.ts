import { castArray } from "lodash-es";
import browser from "webextension-polyfill";
import { Dictionary, LinkType } from "./types/general";
import { Platform, PlatformName, PlatformType } from "./types/platform";
import { Stream } from "./types/stream";

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

export function getLinkForPlatform(stream: Stream, type: LinkType): string {
  const { id, user, platform } = stream;
  switch (platform) {
    case PlatformName.TWITCH:
      switch (type) {
        case LinkType.STREAM:
          return `https://www.twitch.tv/${id}`;
        case LinkType.POPOUT:
          return `https://www.twitch.tv/${id}/popout`;
        case LinkType.CHAT:
          return `https://www.twitch.tv/${id}/chat`;
        case LinkType.VIDEOS:
          return `https://www.twitch.tv/${id}/videos`;
      }

    case PlatformName.GOODGAME:
      switch (type) {
        case LinkType.STREAM:
          return `https://www.goodgame.ru/${user}`;
        case LinkType.POPOUT:
          return `https://www.goodgame.ru/player?${id}`;
        case LinkType.CHAT:
          return `https://www.goodgame.ru/chat/${id}`;
        case LinkType.VIDEOS:
          return "";
      }
    case PlatformName.KICK:
      switch (type) {
        case LinkType.STREAM:
          return `https://www.kick.com/${id}`;
        case LinkType.POPOUT:
          return `https://player.kick.com/${id}`;
        case LinkType.CHAT:
          return `https://kick.com/popout/${id}/chat`;
        case LinkType.VIDEOS:
          return `https://kick.com/${id}/videos`;
      }
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
