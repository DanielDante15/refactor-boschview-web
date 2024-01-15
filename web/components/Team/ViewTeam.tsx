import { Avatar, Box, Chip } from "@mui/material";
import styles from "../../styles/components/ViewTeam.module.scss";
import { User } from "../../common/types";

export default function ViewTeam({ team }: { team: User[] }) {
  if (team == undefined) return <></>;
  return (
    <Box className={styles.teamGrid}>
      {team.map((member, index) => (
        <Chip key={index} label={member.username} avatar={<Avatar
          src={member.profile_picture}
        />}/>
      ))}
    </Box>
  );
}
