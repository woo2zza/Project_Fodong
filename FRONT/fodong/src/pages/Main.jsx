import React from "react";
import { Grid } from "@mui/material";
import Buttons from "../components/main/buttons";
import MainBook from "../components/main/MainBook";
import Title from "../components/main/Title";

const Main = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      direction="column"
      style={containerStyle}
    >
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
  backgroundColor: "#f0e68c", // 밝은 배경색 추가
};

export default Main;
