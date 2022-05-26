import { stores } from "@/common/store";
import { useStore } from "./store";

export default function useLiveStreams() {
  return useStore(stores.liveStreams);
}
