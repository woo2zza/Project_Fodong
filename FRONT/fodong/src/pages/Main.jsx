import React from "react";
import { Grid } from "@mui/material";
import Button from "../components/main/buttons";
import MainBook from "../components/main/MainBook";
import Title from "../components/main/Title";

const Main = () => {
  const containerStyle = {
    padding: "100px",
  };
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      direction="column"
      style={containerStyle}
    >
      <Grid>
        <Title />
      </Grid>
      <Grid item>
        <MainBook />
      </Grid>
      <Grid item>
        <Button />
      </Grid>
    </Grid>
  );
};

export default Main;
