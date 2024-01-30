import { Box, Button } from "@mui/material";
import { Project } from "../../common/types";

import "chart.js/auto";

// import StudentsPerArea from "./StudentsPerArea";
import ProjectsPerArea from "./ProjectsPerArea";
import MostUsedTech from "./MostUsedTech";
import ProjectStatusPerArea from "./ProjectStatusPerArea";
import ProjectsPerStatus from "./ProjectsPerStatus";

import styles from "../../styles/Home.module.scss";
import StudentsPerArea from "./StudentsPerArea";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectDashboard({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const uniqueArray = (array: string[]) => Array.from(new Set(array));

  const [members, setMembers] = useState([])




  useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get(`https://digipro-backend.azurewebsites.net/users/`);
        setMembers(response.data)
      } catch (err: any) {
      } 
    };
    getData();
  }, [])
  

  const uniqueAllAreas = uniqueArray(
    allProjects.map((project) => project.area)
  );

  const uniqueAllCourses = uniqueArray(
    allProjects.map((project) => project.course)
  );

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <h2>Dashboard</h2>
      <div className={styles.dashboard}>
        <Box>
          <StudentsPerArea allProjects={allProjects} />
        </Box>
        <Box>
          <ProjectsPerArea allProjects={allProjects} />
        </Box>
        <Box>
          <ProjectsPerStatus allProjects={allProjects} />
        </Box>
        <Box>
          <MostUsedTech allProjects={allProjects} />
        </Box>
        <Box>
          <ProjectStatusPerArea allProjects={allProjects} />
        </Box>
        <Box className={styles.tiles}>
          <Box className={styles.numbers}>
            <Tile label="Members" data={members.length} />
            <Tile label="Projects" data={allProjects.length} />
            <Tile label="Areas" data={uniqueAllAreas.length} />
            <Tile label="Courses" data={uniqueAllCourses.length} />
          </Box>
        </Box>
      </div>
    </div>
  );
}

function Tile({ label, data }: { label: string; data: any }) {
  return (
    <Box>
      <p>
        <b>{label}: </b>
      </p>
      <p>{data}</p>
    </Box>
  );
}
