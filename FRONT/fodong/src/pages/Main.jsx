import React from "react";
import { Grid } from "@mui/material";
import DropdownButton from "../components/main/DropdownButton"; // Import the new component
import Buttons from "../components/main/buttons";
import MainBook from "../components/main/MainBook";
import Title from "../components/main/Title";

const Main = () => {
  return (
    <Grid container spacing={1} direction="column" style={containerStyle}>
      <Grid item style={{ position: "absolute", top: 0, left: 0 }}>
        <DropdownButton />
      </Grid>
      <Grid item>
        <Title />
      </Grid>
      <Grid item>
        <MainBook />
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
