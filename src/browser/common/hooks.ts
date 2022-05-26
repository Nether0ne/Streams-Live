import { stores } from "@/common/store";
import { GroupBy, SortField, SortDirection } from "@/common/types/settings";
import { useState } from "react";
import { useStore } from "./hooks/store";

export function useModal() {
  const [open, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!open);
  };

  return { open, toggleModal };
}

export function useStreamSettings() {
  const [settings, store] = useStore(stores.settings);
  const { stream } = settings;
  const streamSettingsIsLoading = store.isLoading;
  const [sortField, setFieldState] = useState<SortField>(stream.sortField);
  const [sortDirection, setDirectionState] = useState<SortDirection>(stream.sortDirection);
  const [groupBy, setGroupByState] = useState<GroupBy>(stream.groupBy);

  const reverseSortDirection = () => {
    const direction =
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : sortDirection === SortDirection.DESC
        ? SortDirection.ASC
        : SortDirection.ASC;
    setDirectionState(direction);
    store.set({ ...settings, stream: { ...stream, sortDirection: direction } });
  };

  const setSortField = (field: SortField) => {
    setFieldState(field);
    store.set({ ...settings, stream: { ...stream, sortField: field } });
  };

  const setGroupBy = (groupBy: GroupBy) => {
    setGroupByState(groupBy);
    store.set({ ...settings, stream: { ...stream, groupBy } });
  };

  return {
    sortField,
    sortDirection,
    groupBy,
    setSortField,
    reverseSortDirection,
    setGroupBy,
    streamSettingsIsLoading,
  };
}
