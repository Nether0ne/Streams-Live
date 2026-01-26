import { defaultsDeep } from "lodash-es";
import browser, { Storage } from "webextension-polyfill";

import { defaultSettings, Settings } from "../types/settings";
import { Platform, PlatformName, PlatformType } from "../types/platform";
import { defaultPlatformState } from "../helpers";
import { Streams } from "../types/stream";

export type StoreAreaName = "local" | "managed" | "sync";
export type StoreMigration = (value: any) => Promise<any>;

export interface StoreOptions<T> {
  onChange?(newValue: T, oldValue?: T): void;
  migrations?: StoreMigration[];
  defaultValue: T;
}

export interface StoreState<T> {
  version: number;
  value: T;
}

export type StoreChange<T> = (newValue: T, oldValue?: T) => void;

export class Store<T> {
  private listeners = new Set<StoreChange<T>>();

  private get areaStorage() {
    return browser.storage[this.areaName];
  }

  constructor(
    readonly areaName: StoreAreaName,
    readonly name: string,
    readonly options: StoreOptions<T>
  ) {}

  async setup(migrate = false): Promise<void> {
    if (migrate) {
      await this.migrate();
    }

    const value = await this.get();

    this.listeners.forEach((listener) => {
      listener(value);
    });
  }

  applyChange(changes: Record<string, Storage.StorageChange>, areaName: string) {
    if (areaName !== this.areaName) {
      return;
    }

    const { [this.name]: change } = changes;

    if (change == null) {
      return;
    }

    this.listeners.forEach((listener) => {
      listener(change.newValue.value, change.oldValue.value);
    });
  }

  onChange(listener: StoreChange<T>): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  async getState(): Promise<StoreState<T>> {
    const items = await this.areaStorage.get(this.name);

    return (
      items[this.name] ?? {
        value: this.options.defaultValue,
        version: 1,
      }
    );
  }

  async setState(state: StoreState<T>): Promise<void> {
    await this.areaStorage.set({
      [this.name]: state,
    });
  }

  async get(): Promise<T> {
    return (await this.getState()).value;
  }

  async set(value: T): Promise<void>;
  async set(updater: (value: T) => T): Promise<void>;
  async set(value: any): Promise<void> {
    const state = await this.getState();

    if (typeof value === "function") {
      value = value(state.value);
    }

    await this.setState({
      version: state.version,
      value,
    });
  }

  async restore(state: StoreState<T>): Promise<void> {
    await this.setState(state);
    await this.migrate();
  }

  async migrate(): Promise<void> {
    const state = await this.getState();

    const {
      options: { migrations = [] },
    } = this;

    for (const [index, migration] of migrations.entries()) {
      const version = index + 2;

      if (state.version >= version) {
        break;
      }

      state.value = await migration(state.value);
      state.version = version;
    }

    defaultsDeep(state.value, this.options.defaultValue);

    await this.areaStorage.set({
      [this.name]: state,
    });
  }
}

export const stores = {
  settings: new Store<Settings>("local", "settings", {
    defaultValue: defaultSettings,
    migrations: [
      (value) => {
        const store = new Store("sync", "settings", {
          defaultValue: value,
        });

        return store.get();
      },
    ],
  }),
  twitch: new Store<Platform>("local", "twitchProfile", {
    defaultValue: defaultPlatformState(PlatformName.TWITCH, PlatformType.AUTH),
    migrations: [
      (value) => {
        const store = new Store("sync", "profiles", {
          defaultValue: value,
        });

        return store.get();
      },
    ],
  }),
  goodgame: new Store<Platform>("local", "goodgame", {
    defaultValue: defaultPlatformState(PlatformName.GOODGAME, PlatformType.NONE),
    migrations: [
      (value) => {
        const store = new Store("sync", "profiles", {
          defaultValue: value,
        });

        return store.get();
      },
    ],
  }),
  kick: new Store<Platform>("local", "kick", {
    defaultValue: defaultPlatformState(PlatformName.KICK, PlatformType.AUTH),
    migrations: [
      (value) => {
        const store = new Store("sync", "profiles", {
          defaultValue: value,
        });

        return store.get();
      },
    ],
  }),
  streams: new Store<Streams>("local", "streams", {
    defaultValue: {
      data: [],
      isLoading: true,
    },
  }),
};

browser.storage.onChanged.addListener((changes, areaName) => {
  for (const store of Object.values(stores)) {
    store.applyChange(changes, areaName);
  }
});
