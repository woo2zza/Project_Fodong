import React from "react";
import { Grid } from "@mui/material";
import Buttons from "../components/main/buttons";
import MainBook from "../components/main/MainBook";
import Title from "../components/main/Title";

const Main = () => {
  return (
    <Grid container spacing={2} direction="column" style={containerStyle}>
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
  height: "102vh",
};

export default Main;
