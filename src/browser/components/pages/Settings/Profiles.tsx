import { useProfile } from "@/browser/common/hooks/profile";
import { Platform } from "@/common/types/general";
import { Box } from "@mui/material";
import { FC } from "react";
import Loading from "../../layout/Loading/Loading";
import AddProfile from "./options/profiles/AddProfile";
import ProfileSettings from "./options/profiles/Profile";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  profile: {
    justifyContent: "space-between",
  },
};

const availablePlatforms: Platform[] = [Platform.TWITCH, Platform.YOUTUBE, Platform.GOODGAME];

const ProfilesSettings: FC = () => {
  const [twitchProfile, twitchStore] = useProfile(Platform.TWITCH);
  const [youtubeProfile, youtubeStore] = useProfile(Platform.YOUTUBE);
  const [goodgameProfile, goodgameStore] = useProfile(Platform.GOODGAME);

  const isLoading = twitchStore.isLoading && youtubeStore.isLoading && goodgameStore.isLoading;

  const profilesToRender: Array<Platform | null> = [];

  if (twitchProfile.name) profilesToRender.push(Platform.TWITCH);
  if (youtubeProfile.name) profilesToRender.push(Platform.YOUTUBE);
  if (goodgameProfile.name) profilesToRender.push(Platform.GOODGAME);

  const profilesToAdd = availablePlatforms.filter((i) => profilesToRender.indexOf(i) == -1);

  return (
    <Box sx={styles.wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        profilesToRender.map((platform) =>
          platform ? <ProfileSettings {...{ platform }} /> : null
        )
      )}

      {availablePlatforms.length > profilesToRender.length && (
        <AddProfile options={profilesToAdd} />
      )}
    </Box>
  );
};

export default ProfilesSettings;
