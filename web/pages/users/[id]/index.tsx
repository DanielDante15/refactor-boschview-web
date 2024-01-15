import type { NextPage } from "next";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Notificate, Project, User } from "../../../common/types";
import ViewTechStack from "../../../components/Techs/ViewTechStack";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ViewTeam from "../../../components/Team/ViewTeam";
import styles from "../../../styles/ProjectPage.module.scss";
import Head from "next/head";

const UserPage: NextPage<Notificate> = ({ notificate }) => {
  const router = useRouter();
  const userId = router.query.id;
  const [openDialog, setOpenDialog] = useState(false);

  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (userId == undefined) return;
        const response = await axios.get(
          `http://127.0.0.1:8000/users/${userId}/`
        );
        console.log(response.data);

        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        notificate(`Error: ${err.message}`, "error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [userId, notificate]);

  if (error) return <div>Error</div>;
  if (loading || data == undefined)
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

  const renderImage = () => {
    if (data.profile_picture != undefined)
      return (
        <img
          className={styles.cover}
          alt={data.profile_picture}
          src={data.profile_picture}
          width={500}
          height={300}
        />
      );
  };




  
  return (
    <>
      <Head>
        <title>BoschView | {data.username}</title>
        <meta name="description" content="" />
        <link
          rel="icon"
          href="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYm9zY2hcL2FjY291bnRzXC9hNVwvNDAwMDA5OFwvZmF2aWNvbnNcL2M0XC8xXC80OTE5YmU5YTQ0MWFhNTdlZWY0ZWNjODJjNTNmYTY1Zi0xNTgyODAyMzk2LnBuZyJ9:bosch:IDFHfQ1b9xJR_hcNEngAKJ1pHo2gl9MFWBp2Bn45nFk?width={width}&rect=0,0,32,32&reference_width=32"
        />
      </Head>
      <Box>
        <Box className={styles.header}>
          {/* HEADER */}
          {renderImage()}
          <Box>
            <h1>{data.username}</h1>
            <h3>Stack: {data.stack}</h3>
  
          </Box>
          <Box className={styles.actions}>
            <Button
              className={styles.button}
              variant="contained"
              color="info"
              onClick={() => router.push(`/users/${data.id}/edit`)}
            >
              Edit this User
            </Button>
            <Button
              className={styles.button}
              variant="contained"
              color="warning"
              onClick={() => setOpenDialog(true)}
            >
              Delete this User
            </Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>
                {"Are you sure you want to delete this project?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} autoFocus>
                  No
                </Button>
                <Button
                  onClick={() => {
                    axios
                      .delete(
                        `http://127.0.0.1:8000/users/${data.id}/delete`
                      )
                      .then(() => router.push("/users"));
                    setOpenDialog(false);
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>

        {/* ARTICLE */}
        <Box className={styles.article}>
          <Box className={styles.description}>
            <h2>Description</h2>
            {/* <Box>{data.description}</Box> */}
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default UserPage;
