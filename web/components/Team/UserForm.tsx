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
import { Notificate, User } from "../../common/types";
import styles from "../../styles/components/ProjectForm.module.scss";
import Dropdown from "../DropDown";

interface UserFormProps {
  user_id?: string;
  notificate: Notificate["notificate"];
}

export default function UserForm({
  user_id,
  notificate,
}: UserFormProps) {

  const [inputImage, setInputImage] = useState<any>(undefined);
  const [password, setpassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [inputUser, setInputUser] = useState<User>({
    id: 0,
    name: "",
    username: "",
    stack: '',
    profile_picture: "",
    projects: []
  })
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  useEffect(() => {
    if (user_id != undefined) {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://digi-pro-dev-webapp-backend.azurewebsites.net/users/${user_id}/`
          );
          setInputUser(response.data)
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
  }, [user_id, notificate]);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submiting..");

    if (password != confirmPassword) {
      notificate("As senhas nao estao iguais", "error")
    }


    const formData = new FormData();

    if (inputImage != undefined) {
      console.log("there exists an image");
      formData.append("profile_picture", inputImage);
    }
    else if (inputUser.profile_picture != null) {
      async () => {
        const response = await fetch(inputUser.profile_picture);
        const blob = await response.blob();
        formData.append("profile_picture", blob);
      }
    }
    else {
      formData.append("profile_picture", "");
    }

    if (password != "" && confirmPassword != "" && confirmPassword == password) {
      formData.append("password", confirmPassword)
    }

    formData.append("username", inputUser.username)
    formData.append("name", inputUser.name)
    formData.append("stack", inputUser.stack)







    if (user_id != undefined) {
      console.log("Updating project");

      const response = axios
        .patch(`https://digi-pro-dev-webapp-backend.azurewebsites.net/users/${inputUser.id}/update/`, formData,
        )
        .then(() => notificate("User Updated", "success"))
        .then(() => router.push("/users"))
        .catch((err) => {
          console.log(err);
          notificate(`Error: ${err.message}`, "error");
        });

    } else {
      console.log("Adding new project");
      const response = axios
        .post(`https://digi-pro-dev-webapp-backend.azurewebsites.net/users/create`, formData, {
          params: inputUser,
        })
        .then(() => notificate("User Created", "success"))
        .then(() => router.push("/users"))
        .catch((err) => {
          console.log(err);
          notificate(`Error: ${err.message}`, "error");
        });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleStack = (event: any) => {
    console.log("Testeeeeeee:",event);
    setInputUser((prevState) => ({
      ...prevState,
      ["stack"]: event
    }));
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setpassword(value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setConfirmPassword(value);
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
      inputUser.profile_picture === "" ||
      inputUser.profile_picture === undefined ||
      inputUser.profile_picture === null
    ) {
      console.log("null image");
    } else {
      return (
        <Box>
          <h3>Preview: </h3>
          <img
            className={styles.image}
            alt={inputUser.profile_picture}
            src={`${inputUser.profile_picture}`}
          />
        </Box>
      );
    }
  };


  if (user_id != undefined) {
    if (error) return <div>Error</div>;
    if (loading || inputUser == undefined)
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
    if (user_id != undefined) {
      return <h1>Edit User</h1>;
    } else {
      return <h1>Create User</h1>;
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
            name="name"
            label={"Name"}
            onChange={handleChange}
            value={inputUser.name}
          />
          <TextField
            required
            fullWidth
            name="username"
            label={"Email"}
            onChange={handleChange}
            value={inputUser.username}
          />

          <Dropdown onChange={handleStack} value={inputUser.stack} />
          <TextField

            fullWidth
            type={showPassword ? 'text' : 'password'}
            name="password"

            label={"Password"}
            onChange={handlePassword}
          />
          <TextField

            type={showPassword ? 'text' : 'password'}
            fullWidth
            name="confirmPassword"
            label={"Confirm Password"}
            onChange={handleConfirmPassword}
          />



        </Box>

        <Box className={styles.intermediary}>
          <Box className={styles.middle}>


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
