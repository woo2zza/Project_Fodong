import React from "react";
import { Grid } from "@mui/material";
import DropdownButton from "../components/main/DropdownButton"; // Import the new component
import Buttons from "../components/main/buttons";
import ScrollBook from "../components/main/scrollBook";
import Title from "../components/main/Title";
import FreindsToggler from "../components/main/Friends";
import "./pages.css";
// Main 컴포넌트

const Main = () => {
  return (
    <div className="main_container">
      <div className="fixedTop">
        <Title />
      </div>
      <div className="dropdownMargin">
        <DropdownButton />
      </div>
      <div className="content">
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
      <div className="friends-toggler">
        <FreindsToggler />
      </div>
    </div>
  );
};

export default Main;
