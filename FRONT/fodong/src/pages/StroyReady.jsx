import React from "react";
// import { Route, Routes } from "react-router-dom";
import Background from "../components/storyReady/Background";
import Character from "../components/storyReady/Character";
import StartButton from "../components/storyReady/StartButton";
import BackButton from "../components/storyReady/BackButton";
import { Grid } from "@mui/material";

const StroyReady = () => {
  console.log(1111);
  return (
    // <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Background style={{ display: "flex" }}></Background>
        {/* <BackButton style={{  minWidth: "50%"}}></BackButton>
        <StartButton style={{ minWidth: "50%"}}></StartButton> */}
      {/* <Grid style={{ display: "flex", width: "100%", height: "30vh", alignItems: "center", justifyContent: "space-between", padding: "0 15px" }}> */}
        {/* <Character style={{ flex: 1, minWidth: "calc(100% - 100px)", justifyContent: "center"}}></Character> */}
      {/* </Grid> */}
      </Grid>
    // </Grid>
  );
};

export default StroyReady;
