import { Stream } from "@/common/types/stream";
import { Box, Collapse, Typography } from "@mui/material";
import { FC, useState, useContext } from "react";
import StreamCard from "../../cards/stream/Stream";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GroupBy } from "@/common/types/settings";
import { t } from "@/common/helpers";
import { StreamSettingsContext } from "@/browser/common/context/StreamsSettings";

const styles = {
  cursor: "pointer",
  "& .header": {
    p: ".5rem .5rem",
    transition: "background-color .5s ease-out",
    "&:hover": {
      backgroundColor: "background.paper",
      transition: "background-color .5s ease-out",
    },
    "& svg": {
      fontSize: "1rem",
      mr: ".25rem",
    },
    "& .open": {
      transform: "rotate(180deg)",
    },
  },
};

interface StreamsGroupProps {
  key: string;
  group: Stream[];
}

const StreamsGroup: FC<StreamsGroupProps> = ({ key, group }) => {
  const { streamSettings } = useContext(StreamSettingsContext);
  const { groupBy } = streamSettings;
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);

  return (
    <Box id={key.replace(" ", "")} sx={styles}>
      {key !== "undefined" && (
        <Box className="header" onClick={toggleOpen}>
          <Typography>
            <ArrowDropDownIcon className={open ? "open" : ""} />
            {groupBy === GroupBy.PLATFORM ? t(key) : key || t("noCategory")}
          </Typography>
        </Box>
      )}
      <Collapse in={open}>
        {group.map((stream) => (
          <StreamCard stream={stream} />
        ))}
      </Collapse>
    </Box>
  );
};

export default StreamsGroup;
