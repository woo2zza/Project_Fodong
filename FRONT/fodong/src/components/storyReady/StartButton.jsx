import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
const StartButton = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <div>
        <Link to="/storytelling/1">
          <img
            width="50px"
            height="50px"
            src={require(`./img/startbutton.png`)}
            alt="startbutton"
          />
        </Link>
        <p style={{ textAlign: "center" }}>
          <h3>시작하기~</h3>
        </p>
      </div>
    </Grid>
  );
};

export default StartButton;
