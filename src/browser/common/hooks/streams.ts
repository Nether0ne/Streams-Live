import { stores } from "@/common/store";
import { GroupBy, SortField, SortDirection } from "@/common/types/settings";
import { useEffect, useState } from "react";
import useSettings from "./settings";
import { useStore } from "./store";
import { orderBy } from "lodash-es";
import { useSearch } from "./streamsSettings/search";
import { useGroupBy } from "./streamsSettings/groupBy";
import { useSortField } from "./streamsSettings/sortField";
import { useSortDirection } from "./streamsSettings/sortDirection";

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

  const [streamsWithSettings, setFilteredStreams] = useState(data);

  useEffect(() => {
    let sort = sortDirection;
    if (sortField == SortField.STARTED_AT) {
      sort = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    }

    setFilteredStreams(
      orderBy(data, [sortField], [sort]).filter((stream) => {
        if (search !== undefined) {
          return (stream.title.toLowerCase().includes(search.toLowerCase()) ||
            stream.userName.toLowerCase().includes(search.toLowerCase()) ||
            stream.gameName?.toLowerCase().includes(search.toLowerCase())) as boolean;
        }
        return true;
      })
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

  return { streamsWithSettings, setStreamsSettings, isLoading, streamSettings, settingsIsLoading };
}
