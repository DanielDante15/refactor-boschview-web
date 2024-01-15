import { Box, CircularProgress } from "@mui/material";
import { Project } from "../../common/types";
import Link from "next/link";
import ViewTechStack from "../Techs/ViewTechStack";
import ViewTeam from "../Team/ViewTeam";
import styles from "../../styles/SearchProjectsPage.module.scss";
import miniStyles from "../../styles/components/ModalSearch.module.scss";
import CircularProgressWithLabel from "../circularBar";

export default function ProjectCard({
  project,
  size,
  onClick,
}: {
  project: Project;
  size?: "small" | "normal";
  onClick?: (any?: any) => any;
}) {
  const renderStatus = () => {
    switch (project.status) {
      case "In Progress":
        return <h3 className={styles.yellow}>{project.status}</h3>;
      case "Done":
        return <h3 className={styles.green}>{project.status}</h3>;
      case "Implemented":
        return <h3 className={styles.blue}>{project.status}</h3>;
      default:
        return <h3>{project.status}</h3>;
    }
  };

  const renderImage = () => {

    if (project.image != undefined)
      return (
        <img
          className={styles.cover}
          alt={project.image}
          src={project.image}
          width='100%'
          height='280rem'
        />
      );
  };

  const formatedPrice = (data:number) => {
    if (data == null || data == undefined) {
      return "00,00"
    }
    const price = typeof data === 'number' ? data : parseFloat(data);
    if (!isNaN(price)) {
        const formattedValue = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return formattedValue;
    } else {
        return null;  
    }
    
}

  const renderCard = () => {
    if (size == undefined || size == "normal") {
      return (
        <Box className={styles.projectCard}>

          <Box>
            {renderImage()}
            <h1>{project.project_name}</h1>
            <h2>Course: {project.course}</h2>
            <h4>Area: {project.area}</h4>
            <Box style={{width:"100%",justifyContent:"space-between",display:"flex",alignItems:"center"}}>
              <CircularProgressWithLabel value={project.finish_ratio} /> 
              <h2 style={{marginRight:40}} >Price:  R${formatedPrice(project.price)}</h2>
            </Box>
          </Box>


          {renderStatus()}

          <p>{project.description}</p>
          <Box>
            <h4>Technologies</h4>
            <ViewTechStack stack={project.techs} />
          </Box>

          <Box>
            <h4>Team</h4>
            <ViewTeam team={project.students} />
          </Box>

        </Box>



      );
    }
    if (size != undefined || size == "small") {
      return (
        <Box className={miniStyles.miniProjectCard}>
          <h2>{project.project_name}</h2>
          <h3>Course: {project.course}</h3>
          <p>Area: {project.area}</p>
        </Box>
      );
    }
  };
  if (onClick != undefined)
    return (
      <Link href={`/projects/${project.id}/`}>
        <Box onClick={onClick}>{renderCard()}</Box>
      </Link>
    );
  else
    return <Link href={`/projects/${project.id}/`}>{renderCard()}</Link>;
}
