import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    TextField,
  } from "@mui/material";
  import axios from "axios";
  import type { NextPage } from "next";
  import Head from "next/head";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { Notificate, Project, User } from "../../common/types";
  import ProjectCard from "../../components/Projects/ProjectCard";
  import styles from "../../styles/SearchProjectsPage.module.scss";
import TeamCard from "../../components/Team/TeamCard";
  
  const SearchUsersPage: NextPage<Notificate> = ({ notificate }) => {
    const router = useRouter();
  
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [stackFilter, setStackFilter] = useState("");
    const [projectFilter, setProjectFilter] = useState("")
  
    const [allUsers, setAllUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    function filterData() {
      if (allUsers == undefined) return;
      setFilteredData(
        allUsers
          .filter((x: User) =>
            x.username
              .toLowerCase()
              .includes(
                searchFilter === "" || searchFilter == undefined
                  ? x.username.toLowerCase()
                  : searchFilter.toLowerCase()
              )
          )   
        //   .filter((b: User) =>
        //     stackFilter === "" || stackFilter == undefined
        //       ? b
        //       : b.techs.includes(stackFilter)
        //   )
      );
    }
  
    const uniqueArray = (array: string[]) => Array.from(new Set(array));
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/users/projects`);
          setAllUsers(response.data);
          console.log(response.data);
          
          setFilteredData(response.data);
  
          setError(null);
          const searchParam = router.query.s;
          if (searchParam != undefined) {
            console.log("searching with param");
            setSearchFilter(searchParam.toString());
            setFilteredData(
              response.data.filter((x: Project) =>
                x.project_name
                  .toLowerCase()
                  .includes(searchParam.toString().toLowerCase())
              )
            );
          }
        } catch (err: any) {
          setError(err.message);
          setAllUsers(null);
          notificate(`Error: ${err.message}`, "error");
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, [router, notificate]);
  
    if (error) return <div>Error</div>;
    if (loading || allUsers == undefined)
      return (
        <div
          style={{
            display: "flex",
            height: "80vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      );
  
  
  
  
    return (
      <>
        <Head>
          <title>BoschView | Members</title>
          <meta name="description" content="" />
          <link
            rel="icon"
            href="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYm9zY2hcL2FjY291bnRzXC9hNVwvNDAwMDA5OFwvZmF2aWNvbnNcL2M0XC8xXC80OTE5YmU5YTQ0MWFhNTdlZWY0ZWNjODJjNTNmYTY1Zi0xNTgyODAyMzk2LnBuZyJ9:bosch:IDFHfQ1b9xJR_hcNEngAKJ1pHo2gl9MFWBp2Bn45nFk?width={width}&rect=0,0,32,32&reference_width=32"
          />
        </Head>
        <div className={styles.container}>
          <h1>Search Users</h1>
          <Box className={styles.filter}>
            {/* Filters */}
            {/* <Autocomplete
              options={uniqueArray(allProjects.map((project) => project.area))}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Area" />
              )}
              onInputChange={(e, value) => setAreaFilter(value)}
            />
            <Autocomplete
              options={uniqueArray(allProjects.map((project) => project.course))}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Course" />
              )}
              onInputChange={(e, value) => setCourseFilter(value)}
            />
            <Autocomplete
              options={uniqueArray(allProjects.map((project) => project.status))}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Status" />
              )}
              onInputChange={(e, value) => setStatusFilter(value)}
            /> */}
            {/* <Autocomplete
              options={uniqueArray(
                allUsers
                  .map((project) => {
                    const projectTechs = project.techs.split(";");
                    return projectTechs;
                  })
                  .flat(1)
              )}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Tech" />
              )}
              onInputChange={(e, value) => {
                setStackFilter(value);
              }}
            /> */}
            <TextField
              fullWidth
              label="Search by name"
              variant="outlined"
              value={searchFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchFilter(e.target.value)
              }
            />
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={() => filterData()}
            >
              Search
            </Button>
          </Box>
          <Box>
            {/* Filtered Data */}
            <p style={{fontSize:20}}>{filteredData.length} Users found</p>
            <Box className={styles.cardsGrid}>
              {filteredData.map((member, index) => {
  
                return <TeamCard key={index} members={member} />;
              })}
            </Box>
          </Box>
        </div>
      </>
    );
  };
  
  export default SearchUsersPage;
  