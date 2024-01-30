import { StyledOptions } from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Notificate, Project, User } from "../../common/types";
import EditTechStack from "../Techs/EditTechStack";
import styles from "../../styles/components/ProjectForm.module.scss";
import UserDropdown from "../Team/UserDropdown";

interface ProjectFormProps {
  project_id?: string;
  notificate: Notificate["notificate"];
}

export default function ProjectForm({
  project_id,
  notificate,
}: ProjectFormProps) {
  const [inputProject, setInputProject] = useState<Project>({
    project_name: "",
    students: [],
    area: "",
    course: "",
    created_date: "",
    description: "",
    techs: "",
    contact: "",
    finish_ratio: 0,
    status: "",
    id: 0,
    image: "",
    price: 0,
    proposal: "",
    outside_scope_items: "",
    requirements: ""
  });
  const [inputImage, setInputImage] = useState<any>(undefined);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [projectMembers, setProjectMembers] = useState<User[]>([])
  const [error, setError] = useState(null);
  useEffect(() => {
    if (project_id != undefined) {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://digipro-backend.azurewebsites.net/projects/users/${project_id}`
          );
          setInputProject(response.data);
          setProjectMembers(response.data.students)
          console.log(response.data);

          setError(null);
        } catch (err: any) {
          setError(err.message);
          notificate(`Error: ${err.message}`, "error");
        } finally {
          setLoading(false);
        }
      };
      getData();
    }
  }, [project_id, notificate]);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submiting..");


    if (inputProject.image === null) {
      inputProject.image = "";
    }

    if (projectMembers.length == 0) {
      notificate("Fill at least one member of the team", "warning");
      return;
    }

    if (inputProject.techs == "") {
      notificate("Fill at least one technology", "warning");
      return;
    }

    const formData = new FormData();

    if (inputImage != undefined) {
      console.log("there exists an image");
      formData.append("image", inputImage);
    }
    else if (inputProject.image != null) {
      async () => {
        const response = await fetch(inputProject.image);
        const blob = await response.blob();
        formData.append("image", blob);
      }
    }
    else {
      formData.append("image", "");
    }

    if (inputProject.price > 0) {
      formData.append("price", inputProject.price.toString())
    }


    formData.append("project_name", inputProject.project_name)
    formData.append("area", inputProject.area)
    formData.append("course", inputProject.course)
    formData.append("created_date", inputProject.created_date)
    formData.append("description", inputProject.description)
    formData.append("techs", inputProject.techs)
    formData.append("contact", inputProject.contact)
    formData.append("finish_ratio", inputProject.finish_ratio.toString())
    formData.append("status", inputProject.status)
    formData.append("proposal", inputProject.proposal)
    formData.append("requirements", inputProject.requirements)
    formData.append("outside_scope_items", inputProject.outside_scope_items)

    for (const student of projectMembers) {
      formData.append("students", student.id.toString())
    }



    if (project_id != undefined) {
      console.log("Updating project");

      const response = axios
        .patch(`https://digipro-backend.azurewebsites.net/projects/${inputProject.id}/update/`, formData,
        )
        .then(() => notificate("Project Updated", "success"))
        .then(() => router.push("/projects"))
        .catch((err) => {
          console.log(err);
          notificate(`Error: ${err.message}`, "error");
        });

    } else {
      console.log("Adding new project");
      const response = axios
        .post(`https://digipro-backend.azurewebsites.net/projects/create`, formData, {
          params: inputProject,
        })
        .then(() => notificate("Project Created", "success"))
        .then(() => router.push("/projects"))
        .catch((err) => {
          console.log(err);
          notificate(`Error: ${err.message}`, "error");
        });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const renderImage = () => {
    if (inputImage != undefined) {
      console.log("inputed image");
      return (
        <Box>
          <h3>Preview: </h3>
          <img
            className={styles.image}
            alt={inputImage.filename}
            src={URL.createObjectURL(inputImage)}
          />
        </Box>
      );
    }

    if (
      inputProject.image === "" ||
      inputProject.image === undefined ||
      inputProject.image === null
    ) {
      console.log("null image");
    } else {
      return (
        <Box>
          <h3>Preview: </h3>
          <img
            className={styles.image}
            alt={inputProject.image}
            src={`${inputProject.image}`}
          />
        </Box>
      );
    }
  };

  const addTech = (tech: string) => {
    if (inputProject.techs == "") {
      setInputProject((prevState) => ({
        ...prevState,
        ["techs"]: tech,
      }));
    } else {
      if (!inputProject.techs.split(";").includes(tech))
        setInputProject((prevState) => ({
          ...prevState,
          ["techs"]: `${inputProject.techs};${tech}`,
        }));
      else {
        alert("The tech already exists!");
      }
    }
  };

  const deleteTech = (tech: string) => {
    setInputProject((prevState) => ({
      ...prevState,
      ["techs"]: inputProject.techs
        .split(";")
        .filter((item) => item != tech)
        .join(";"),
    }));
  };

  if (project_id != undefined) {
    if (error) return <div>Error</div>;
    if (loading || inputProject == undefined)
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
  }

  const editOrCreate = () => {
    if (project_id != undefined) {
      return <h1>Edit Project</h1>;
    } else {
      return <h1>Create Project</h1>;
    }
  };

  return (
    <Box className={styles.container}>
      {editOrCreate()}
      <form
        className={styles.form}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
        onSubmit={handleSubmit}
      >
        <Box className={styles.start}>
          <TextField
            required
            fullWidth
            name="project_name"
            label={"Name"}
            onChange={handleChange}
            value={inputProject.project_name}
          />

          <TextField
            required
            fullWidth
            name="course"
            label={"Course"}
            onChange={handleChange}
            value={inputProject.course}
          />

          <TextField
            required
            fullWidth
            name="contact"
            label={"Contact"}
            onChange={handleChange}
            value={inputProject.contact}
          />

          <TextField
            required
            fullWidth
            name="area"
            label={"Area"}
            onChange={handleChange}
            value={inputProject.area}
          />



          <TextField
            fullWidth
            name="proposal"
            label={"Proposal"}
            onChange={handleChange}
            value={inputProject.proposal}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            name="outside_scope_items"
            label={"Outside Scope Items"}
            onChange={handleChange}
            value={inputProject.outside_scope_items}
            multiline
            rows={4}
          />

          <Box className={styles.slider}>
            <p>Finish Ratio *</p>
            <Slider
              sx={{ width: "95%" }}
              valueLabelFormat={(value: number) => `${value}%`}
              valueLabelDisplay="on"
              value={inputProject.finish_ratio}
              name="finish_ratio"
              onChange={handleChange}
              step={10}
              marks
              min={0}
              max={100}
            />
          </Box>
        </Box>

        <Box className={styles.intermediary}>

          <Box className={styles.middle}>
            <h3>Details</h3>
            <FormControl>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                required
                fullWidth
                name="status"
                labelId="status-label"
                label="Status"
                value={inputProject.status}
                onChange={handleChange}
              >
                <MenuItem value={"Done"}>Done</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Implemented"}>Implemented</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              fullWidth
              name="price"
              label={"Price (R$)"}
              onChange={handleChange}
              type="number"
              value={inputProject.price}
            />
            <Box >
              <TextField
                fullWidth
                name="description"
                label={"Description"}
                onChange={handleChange}
                value={inputProject.description}
                multiline
                rows={4}
              />

            </Box>


            <UserDropdown users={projectMembers} callback={setProjectMembers} />

            <EditTechStack
              stack={inputProject.techs}
              addTech={addTech}
              deleteTech={deleteTech}
            />
          </Box>
          <Box className={styles.end}>
            {renderImage()}
            <Button
              sx={{ height: "4rem", fontSize: 12 }}
              variant="contained"
              component="label"
            >
              Upload / file
              <input
                onChange={(e: any) => {
                  setInputImage(e.target.files[0]);
                }}
                id="input-file"
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
          </Box>
        </Box>

        <Button
          sx={{ height: "4rem" }}
          color="success"
          variant="contained"
          type="submit"
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
}
