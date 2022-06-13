import { Store } from "@/common/store";
import { useState, useEffect } from "react";

export interface UseStoreState<T> {
  isLoading: boolean;
  value: T;
}

export type UseStoreReturn<T> = [
  T,
  {
    isLoading: boolean;
    set(value: T): Promise<void>;
    set(updater: (value: T) => T): Promise<void>;
  }
];

export function useStore<T>(store: Store<T>): UseStoreReturn<T> {
  const [state, setState] = useState<UseStoreState<T>>({
    value: store.options.defaultValue,
    isLoading: true,
  });

  useEffect(() => {
    setState({
      value: store.options.defaultValue,
      isLoading: true,
    });

    const dispose = store.onChange((value) => {
      setState((state) => ({ ...state, value }));
    });

    store.get().then((value) => {
      setState({
        isLoading: false,
        value,
      });
    });

    return dispose;
  }, [store]);

  const set = store.set.bind(store);

  return [state.value, { ...state, set }];
}
