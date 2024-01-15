import { Box, Button, InputAdornment, Modal, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Notificate } from "../common/types";
import ModalSearch from "./ModalSearch";
import styles from "../styles/components/Header.module.scss";

export default function Header({
  notificate,
}: {
  notificate: Notificate["notificate"];
}) {
  const [openModal, setOpenModal] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const router = useRouter();

  const handleKeyPress = useCallback((e: any) => {
    if ("key" in e && e.key.toLowerCase() === "q" && e.ctrlKey) {
      setOpenModal((prevState) => !prevState);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, setOpenModal, openModal]);

  const updateDimensions = () => {
    if (window.innerWidth > 900) {
      setPlaceholder("Ctrl Q to Quick Search");
    } else {
      setPlaceholder("");
    }
  };
  useEffect(() => {
    if (window.innerWidth > 900) {
      setPlaceholder("Ctrl Q to Quick Search");
    }
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <Box>
      <BoschLine />
      <Box className={styles.header}>
        {/* START */}
        <Box className={styles.start} onClick={() => router.push("/")}>
          <img className={styles.logo} src="/logo_bosch.png" />
        </Box>

        {/* END */}
        <Box className={styles.end}>
          <TextField
            className={styles.searchBar}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img width={20} src="/icon-pesquisa.svg" />
                </InputAdornment>
              ),
            }}
            disabled
            placeholder={placeholder}
            variant="outlined"
            onClick={() => setOpenModal(true)}
          />

          <Box className={styles.add} onClick={() => router.push("/login")}>
            <img height={"100%"} src="/icon-saida.svg" />
          </Box>

          <Button
            className={styles.add}
            variant="contained"
            size="small"
            onClick={() => router.push("/projects/create")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" style={{ height: 25, width: 25 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>

          </Button>

          <Button
            className={styles.add}
            variant="contained"
            size="small"
            onClick={() => router.push("/users/create")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" style={{ height: 25, width: 25 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </Button>

          <ModalSearch
            notificate={notificate}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </Box>
      </Box>
    </Box>
  );
}

function BoschLine() {
  return (
    <Box style={{ width: "100%", height: "0.5rem", display: "flex" }}>
      <img
        style={{ objectFit: "cover", width: "100%" }}
        src="/Bosch-Supergraphic.svg"
      />
    </Box>
  );
}
