import { sendRuntimeMessage } from "@/common/helpers";
import pTimeout from "p-timeout";
import { useState } from "react";
import { useEffectOnce, useHarmonicIntervalFn } from "react-use";

// 30 sec check interval
const checkInterval = 30000;
// 1 sec timeout
const timeout = 1000;

export function usePingError(): [Error | null, () => void] {
  const [error, setError] = useState<Error | null>(null);

  const check = () => {
    const promise = pTimeout(sendRuntimeMessage("ping"), timeout);

    promise.then(
      () => setError(null),
      (error: Error) => setError(error)
    );
  };

  useEffectOnce(check);
  useHarmonicIntervalFn(check, checkInterval);

  return [error, check];
}
