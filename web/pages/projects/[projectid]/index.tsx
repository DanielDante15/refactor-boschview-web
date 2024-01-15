import type { NextPage } from "next";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Notificate, Project } from "../../../common/types";
import ViewTechStack from "../../../components/Techs/ViewTechStack";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ViewTeam from "../../../components/Team/ViewTeam";
import styles from "../../../styles/ProjectPage.module.scss";
import Head from "next/head";

const ProjectPage: NextPage<Notificate> = ({ notificate }) => {
  const router = useRouter();
  const projectid = router.query.projectid;

  const [openDialog, setOpenDialog] = useState(false);

  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (projectid == undefined) return;
        const response = await axios.get(
          `http://127.0.0.1:8000/projects/users/${projectid}`
        );
 

        // Formatando o número no formato desejado


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
  }, [projectid, notificate]);

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
    if (data.image != undefined)
      return (
        <img
          className={styles.cover}
          alt={data.image}
          src={data.image}
          width={500}
          height={300}
        />
      );
  };

  const formatedData = (str: string) => {
    var dataObjeto = new Date(str);
    var dia = dataObjeto.getDate();
    var mes = dataObjeto.getMonth() + 1;
    var ano = dataObjeto.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }

  const renderStack = () => {
    if (data.techs != undefined && data.techs != "")
      return (
        <Box>
          <h2>Technologies</h2>
          <ViewTechStack stack={data.techs} />
        </Box>
      );
  };

  const renderTeam = () => {
    if (data.students != undefined)
      return (
        <Box>
          <h2>Team</h2>
          <ViewTeam team={data.students} />
        </Box>
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

  return (
    <>
      <Head>
        <title>BoschView | {data.project_name}</title>
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
            <h1>{data.project_name}</h1>
            <h3>Area: {data.area}</h3>
            <h3>Start date: {formatedData(data.created_date)}</h3>
            <h3>Contact: {data.contact}</h3>
            <h3>Course: {data.course}</h3>
            <h1>Price: R${formatedPrice(data.price)}</h1>
          </Box>

          <Box>
            <h1>Entregas</h1>
            <Stepper activeStep={4}>

              <Step >
                <StepLabel>Jan1</StepLabel>
              </Step>
              <Step  >
                <StepLabel>fev1</StepLabel>
              </Step>
              <Step >
                <StepLabel>mar1</StepLabel>
              </Step>
              <Step >
                <StepLabel>abr1</StepLabel>
              </Step>
              <Step >
                <StepLabel>mai1</StepLabel>
              </Step>

            </Stepper>
          </Box>
          <Box className={styles.actions}>
            <Button
              className={styles.button}
              variant="contained"
              color="info"
              onClick={() => router.push(`/projects/${data.id}/edit`)}
            >
              Edit this project
            </Button>
            <Button
              className={styles.button}
              variant="contained"
              color="warning"
              onClick={() => setOpenDialog(true)}
            >
              Delete this project
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
                        `http://127.0.0.1:8000/projects/${data.id}/delete`
                      )
                      .then(() => router.push("/projects"));
                    setOpenDialog(false);
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>

          </Box>
          {renderTeam()}

        </Box>

        {/* ARTICLE */}
        <Box sx={{ display: "flex" }}>
          <Box className={styles.article}>
            <Box className={styles.description}>

              <Box sx={[]}>
                <h2>Description</h2>
                {data.description}
              </Box>
            </Box>
            {renderStack()}
          </Box>


          <Box sx={{ padding: 5, width: '70%' }}>
            <h2>Project Proposal</h2>
            {data.proposal}
          </Box>
        </Box>

        <Box sx={{ marginLeft: 12,paddingBottom:20, width: '70%' }}>
          <h2>Outside Scope Items</h2>
          {data.outside_scope_items}
        </Box>
      </Box>
    </>
  );
};

export default ProjectPage;
