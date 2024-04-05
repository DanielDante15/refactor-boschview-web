import { Button, CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Notificate, Project } from "../common/types";
import useFetch, { FetchResult } from "react-fetch-hook";
import ProjectDashboard from "../components/Charts/ProjectDashboard";

import styles from "../styles/Home.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage: NextPage<Notificate> = ({ notificate }) => {
  const router = useRouter();
  const { isLoading, data, error }: FetchResult<Project[]> = useFetch(
    `https://digi-pro-dev-webapp-backend.azurewebsites.net/projects`


  );


  if (error) return <div>Error</div>;
  if (isLoading || data == undefined)
    return (
      <>
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
      </>

    );

  return (
    <>
      <Head>
        <title>BoschView | Home</title>
        <meta name="description" content="" />
        <link
          rel="icon"
          href="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYm9zY2hcL2FjY291bnRzXC9hNVwvNDAwMDA5OFwvZmF2aWNvbnNcL2M0XC8xXC80OTE5YmU5YTQ0MWFhNTdlZWY0ZWNjODJjNTNmYTY1Zi0xNTgyODAyMzk2LnBuZyJ9:bosch:IDFHfQ1b9xJR_hcNEngAKJ1pHo2gl9MFWBp2Bn45nFk?width={width}&rect=0,0,32,32&reference_width=32"
        />
      </Head>
      <div className={styles.container} >
        <h1>Welcome</h1>
        <Button variant="outlined" onClick={() => router.push("/projects")}>
          See All Projects
        </Button>
        <>&nbsp;&nbsp;&nbsp;</>
        <Button variant="outlined" onClick={() => router.push("/users")}>
          See All Members
        </Button>
        <ProjectDashboard allProjects={data} />
      </div>
    </>
  );
};

export default HomePage;
