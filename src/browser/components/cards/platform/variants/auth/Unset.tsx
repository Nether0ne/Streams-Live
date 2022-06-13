import { PlatformName } from "@/common/types/platform";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import PlatformWrapper from "../Wrapper";
import AddIcon from "@mui/icons-material/Add";
import { sendRuntimeMessage, t } from "@/common/helpers";

interface UnsetAuthProfileProps {
  readonly platformName: PlatformName;
}

const UnsetAuthProfile: FC<UnsetAuthProfileProps> = ({ platformName }) => {
  return (
    <PlatformWrapper
      {...{ platformName }}
      leftChildren={<Typography variant="body2">{t(platformName)} profile is not set</Typography>}
      rightChildren={
        <Tooltip title={<Typography>{t("addProfile")}</Typography>} placement="top">
          <IconButton onClick={() => sendRuntimeMessage("authInit", platformName)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      }
    />
  );
};

export default UnsetAuthProfile;
