import { Box, Chip } from "@mui/material";
import styles from "../../styles/components/ViewTeam.module.scss";
import { Project } from "../../common/types";

export default function ViewProjects({ project }: { project: Project[] }) {
  if (project == undefined) return <></>;
  return (
    <Box className={styles.teamGrid}>
      {project.map((proj, index) => (
        <Chip key={index} label={proj.project_name} 
        />
      ))}
    </Box>
  );
}
