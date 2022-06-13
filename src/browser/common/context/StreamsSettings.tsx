import { FC, createContext } from "react";
import { defaultSettings, StreamSettings } from "@/common/types/settings";
import { Stream } from "@/common/types/stream";
import { Dictionary } from "lodash";
import { useStreamsWithSettings } from "../hooks/streams";

interface StreamSettingsProps {
  children: JSX.Element;
}

export const StreamSettingsContext = createContext({
  streamGroups: {} as Dictionary<Stream[]>,
  setStreamsSettings: (_params: {
    search?: string;
    groupBy?: StreamSettings["groupBy"];
    sortField?: StreamSettings["sortField"];
    sortDirection?: StreamSettings["sortDirection"];
  }) => {},
  isLoading: true,
  streamSettings: { ...defaultSettings.stream, search: "" },
  settingsIsLoading: true,
});

export const StreamSettingsProvider: FC<StreamSettingsProps> = ({ children }) => {
  const { streamGroups, setStreamsSettings, isLoading, streamSettings, settingsIsLoading } =
    useStreamsWithSettings();

  const contextValue = {
    streamGroups,
    setStreamsSettings,
    isLoading,
    streamSettings,
    settingsIsLoading,
  };

  return (
    <StreamSettingsContext.Provider value={contextValue}>{children}</StreamSettingsContext.Provider>
  );
};
