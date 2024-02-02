import React from "react";
import { Grid } from "@mui/material";
import DropdownButton from "../components/main/DropdownButton"; // Import the new component
import Buttons from "../components/main/buttons";
import ScrollBook from "../components/main/scrollBook";
import Title from "../components/main/Title";

const Main = () => {
  return (
    <div style={containerStyle}>
      <div style={fixedTopStyle}>
        <Title />
      </div>
      <div style={{ marginTop: "50px" }}>
        <DropdownButton />
      </div>

      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ flexGrow: 1 }}
      >
        <Grid item>
          <ScrollBook />
        </Grid>
        <Grid item>
          <Buttons />
        </Grid>
      </Grid>
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  backgroundColor: "#f0e68c", // 밝고 친근한 배경색
};

const fixedTopStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  padding: "20px",
};
export default Main;
