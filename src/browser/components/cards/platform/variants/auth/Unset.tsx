import { PlatformName } from "@/common/types/platform";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import PlatformWrapper from "../Wrapper";
import AddIcon from "@mui/icons-material/Add";
import { t } from "@/common/helpers";
import LoginLink from "@/browser/components/misc/LoginLink";

interface UnsetAuthProfileProps {
  readonly platformName: PlatformName;
}

const UnsetAuthProfile: FC<UnsetAuthProfileProps> = ({ platformName }) => {
  return (
    <LoginLink {...{ platformName }}>
      <PlatformWrapper
        {...{ platformName }}
        leftChildren={<Typography variant="body2">{t(platformName)} profile is not set</Typography>}
        rightChildren={
          <Tooltip title={<Typography>{t("addProfile")}</Typography>} placement="top">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Tooltip>
        }
      />
    </LoginLink>
  );
};

export default UnsetAuthProfile;
