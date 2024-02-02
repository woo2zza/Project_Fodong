import React from "react";
import { Grid } from "@mui/material";
import DropdownButton from "../components/main/DropdownButton"; // Import the new component
import Buttons from "../components/main/buttons";
import ScrollBook from "../components/main/scrollBook";
import Title from "../components/main/Title";

const Main = () => {
  return (
    <Grid container spacing={2} direction="column" style={containerStyle}>
      <Grid item style={{ position: "absolute", top: 0, left: 0 }}>
        <DropdownButton />
      </Grid>
      <Grid item>
        <Title />
      </Grid>
      <Grid item>
        <ScrollBook />
      </Grid>
      <Grid item>
        <Buttons />
      </Grid>
    </Grid>
  );
};

const containerStyle = {
  padding: "100px",
  backgroundColor: "#f0e68c",
  display: "flex",
  justifyContent: "center",
  direction: "column",
  height: "100vh",
};

export default Main;
