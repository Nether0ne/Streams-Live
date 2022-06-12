import { usePlatform } from "@/browser/common/hooks/platform";
import { FollowedStreamer, PlatformName } from "@/common/types/platform";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  Portal,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { sendRuntimeMessage, t } from "@/common/helpers";

const styles = {
  backdrop: {
    backdropFilter: "blur(2px)",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
    maxWidth: "20rem",
    m: "0 auto",
  },
  background: {
    backgroundColor: "background.default",
    borderRadius: 2,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    px: 2,
    pb: 2,
    mt: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    m: ".25rem",
    ml: "1rem",
  },
  closeIcon: {
    fontSize: "1rem",
  },
  footer: {
    box: {
      display: "flex",
      flexDirection: "row",
      gap: 2,
      mt: "1rem",
    },
    typography: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      fontSize: "1rem",
      marginRight: "0.1rem",
    },
  },
};

interface ManageStreamersModalProps {
  readonly platformName: PlatformName;
  readonly open: boolean;
  readonly hide: () => void;
}

const ManageStreamersModal: FC<ManageStreamersModalProps> = ({ platformName, open, hide }) => {
  const [platform, store] = usePlatform(platformName);
  const { followedStreamers } = platform;
  const [streamer, setStreamer] = useState("");
  const [fetching, setFetching] = useState(false);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [selectOptions, setSelectOptions] = useState<FollowedStreamer[]>([]);
  const handleInput = (event: SyntheticEvent, streamerToAdd: FollowedStreamer) => {
    console.log(event);
  };
  const addStreamer = (streamerToAdd: FollowedStreamer) => {
    const alreadyAddedStreamer =
      followedStreamers.find((streamer) => streamer.name === streamerToAdd.name) || false;

    if (!alreadyAddedStreamer) {
      store.set({
        ...platform,
        followedStreamers: [...followedStreamers, streamerToAdd],
      });
      setStreamer("");
      setAutocompleteOpen(false);
    }
  };

  useEffect(() => {
    if (!fetching) {
      setFetching(true);
      (async () => {
        try {
          const searchResults: FollowedStreamer[] = await sendRuntimeMessage(
            "search",
            platform,
            streamer
          );
          setSelectOptions(searchResults);
        } catch (e: unknown) {}
        setFetching(false);
      })();
    }
  }, [streamer]);

  useEffect(() => {
    if (!open) {
      setSelectOptions([]);
    }
  }, [open]);

  return (
    <Portal>
      <Modal
        id="donateModal"
        open={open}
        onClose={hide}
        closeAfterTransition
        sx={styles.backdrop}
        // TODO: fix backdrop behavior
        // BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <Box sx={styles.wrapper}>
            <Box sx={styles.background}>
              <Box sx={styles.content}>
                <Box sx={styles.header}>
                  <Typography variant="body2">Manage followed streamers</Typography>

                  <IconButton onClick={hide}>
                    <CloseIcon sx={styles.closeIcon} />
                  </IconButton>
                </Box>
                <Autocomplete
                  id="streamerSearch"
                  open={autocompleteOpen}
                  onOpen={() => {
                    setAutocompleteOpen(true);
                  }}
                  onClose={() => {
                    setAutocompleteOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  getOptionLabel={(option) => option.name}
                  options={selectOptions}
                  loading={fetching}
                  // TODO: on select, add to followed streamers
                  // onSelect={handleInput}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search streamer"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setStreamer(event.target.value)
                      }
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {fetching ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
                <Box sx={styles.info}>
                  {followedStreamers.length > 0 ? (
                    followedStreamers.map((streamer) => <Typography>{streamer.name}</Typography>)
                  ) : (
                    <Typography>No followed streamers</Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Portal>
  );
};

export default ManageStreamersModal;
