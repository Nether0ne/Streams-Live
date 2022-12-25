import { stores } from "@/common/store";
import { GroupBy, SortField, SortDirection } from "@/common/types/settings";
import { useEffect, useState } from "react";
import useSettings from "./settings";
import { useStore } from "./store";
import { orderBy, groupBy as groupItemsBy } from "lodash-es";
import { useSearch } from "./streamsSettings/search";
import { useGroupBy } from "./streamsSettings/groupBy";
import { useSortField } from "./streamsSettings/sortField";
import { useSortDirection } from "./streamsSettings/sortDirection";
import { Dictionary } from "lodash";
import { Stream } from "@/common/types/stream";

export default function useStreams() {
  return useStore(stores.streams);
}

export function useStreamsWithSettings() {
  const [, store] = useSettings();
  const settingsIsLoading = store.isLoading;

  const { search, setSearch } = useSearch();
  const { groupBy, setGroupBy } = useGroupBy();
  const { sortField, setSortField } = useSortField();
  const { sortDirection, setSortDirection } = useSortDirection();

  const [streams] = useStreams();
  const { data, isLoading } = streams;

  const [streamGroups, setFilteredStreams] = useState<Dictionary<Stream[]>>({});

  useEffect(() => {
    let sort = sortDirection;
    if (sortField == SortField.STARTED_AT) {
      sort = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    }

    const groupedStreams = groupItemsBy(
      orderBy(data, [sortField], [sort]).filter((stream) => {
        if (search !== undefined) {
          return (stream.title.toLowerCase().includes(search.toLowerCase()) ||
            stream.user.toLowerCase().includes(search.toLowerCase()) ||
            stream.game?.toLowerCase().includes(search.toLowerCase())) as boolean;
        }
        return true;
      }),
      groupBy
    );

    const sortedGroupStreams = Object.entries(groupedStreams)
      .sort(([a, aStreams], [b, bStreams]) => {
        switch (sortField) {
          case SortField.NAME:
            return sort === SortDirection.ASC ? (a >= b ? -1 : 1) : a >= b ? 1 : 1;
          case SortField.STARTED_AT:
            const uptimeReducer = (total: number, stream: Stream) =>
              total + (new Date().getTime() - new Date(stream.startedAt || 0).getTime());
            return sort === SortDirection.ASC
              ? aStreams.reduce(uptimeReducer, 0) >= bStreams.reduce(uptimeReducer, 0)
                ? -1
                : 1
              : aStreams.reduce(uptimeReducer, 0) >= bStreams.reduce(uptimeReducer, 0)
              ? 1
              : -1;
          default:
            const viewersReducer = (total: number, stream: Stream) => total + stream.viewers;
            return sort === SortDirection.ASC
              ? aStreams.reduce(viewersReducer, 0) >= bStreams.reduce(viewersReducer, 0)
                ? 1
                : -1
              : aStreams.reduce(viewersReducer, 0) >= bStreams.reduce(viewersReducer, 0)
              ? -1
              : 1;
        }
      })
      .reduce((o: Dictionary<Stream[]>, [name, streams]) => ({ ...o, [name]: streams }), {});

    setFilteredStreams(sortedGroupStreams);
  }, [data, search, groupBy, sortField, sortDirection]);

  const setStreamsSettings = (params: {
    search?: string;
    groupBy?: GroupBy;
    sortField?: SortField;
    sortDirection?: SortDirection;
  }) => {
    const { search, groupBy, sortField, sortDirection } = params;
    if (search !== undefined) {
      setSearch(search);
    }
    if (groupBy) {
      setGroupBy(groupBy);
    }
    if (sortField) {
      setSortField(sortField);
    }
    if (sortDirection) {
      setSortDirection(sortDirection);
    }
  };

  const streamSettings = {
    search,
    groupBy,
    sortField,
    sortDirection,
  };

  return { streamGroups, setStreamsSettings, isLoading, streamSettings, settingsIsLoading };
}
