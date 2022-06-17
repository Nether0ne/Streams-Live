import { stores } from "@common/store";
import { GroupBy, SortField, SortDirection } from "@customTypes/settings";
import { useEffect, useState } from "react";
import useSettings from "@hooks/settings";
import { useStore } from "@hooks/store";
import { orderBy, groupBy as groupItemsBy } from "lodash-es";
import { useSearch } from "@hooks/streamsSettings/search";
import { useGroupBy } from "@hooks/streamsSettings/groupBy";
import { useSortField } from "@hooks/streamsSettings/sortField";
import { useSortDirection } from "@hooks/streamsSettings/sortDirection";
import { Dictionary } from "lodash";
import { Stream } from "@customTypes/stream";

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

    setFilteredStreams(
      groupItemsBy(
        orderBy(data, [sortField], [sort]).filter((stream) => {
          if (search !== undefined) {
            return (stream.title.toLowerCase().includes(search.toLowerCase()) ||
              stream.user.toLowerCase().includes(search.toLowerCase()) ||
              stream.game?.toLowerCase().includes(search.toLowerCase())) as boolean;
          }
          return true;
        }),
        groupBy
      )
    );
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
