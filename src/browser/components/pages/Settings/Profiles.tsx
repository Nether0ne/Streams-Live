import { useAllSetProfiles } from "@/browser/common/hooks/profile";
import { Platform } from "@/common/types/general";
import { Box } from "@mui/material";
import { FC } from "react";
import AddProfile from "./options/profiles/AddProfile";
import ProfileSettings from "./options/profiles/Profile";
import ProfileLoading from "./options/profiles/ProfileLoading";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  profile: {
    justifyContent: "space-between",
  },
};

const availablePlatforms = Object.values(Platform);

const ProfilesSettings: FC = () => {
  const profiles = useAllSetProfiles();
  const isLoading =
    profiles.length > 0 ? profiles.every(({ store }) => store.isLoading === true) : false;
  const profilesToRender: Array<Platform | null> = [];
  const profilesToAdd = availablePlatforms.filter(
    (i) => profiles.map(({ profile }) => profile.platform).indexOf(i) == -1
  );

  return (
    <Box id="profiles" sx={styles.wrapper}>
      {isLoading ? (
        <ProfileLoading />
      ) : (
        profiles.map(({ profile }) => <ProfileSettings platform={profile.platform} />)
      )}

      {availablePlatforms.length > profilesToRender.length && (
        <AddProfile options={profilesToAdd} />
      )}
    </Box>
  );
};

export default ProfilesSettings;
