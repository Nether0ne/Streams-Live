import { stores } from "@/common/store";

export async function setup(migrate = false): Promise<void> {
  const allStores = Object.values(stores);
  const promises = allStores.map((store) => store.setup(migrate));
  await Promise.allSettled(promises);
}
