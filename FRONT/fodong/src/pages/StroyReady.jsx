import React from "react";
// import { Route, Routes } from "react-router-dom";
import Background from "../components/storyReady/Background";
import { Grid } from "@mui/material";

const StroyReady = () => {
  console.log(1111);
  const ant = require("../../public/img/antstory/character/ant/1.jpg")
  const grasshopper = require("../../public/img/antstory/character/grasshopper/1.jpg")

  return (
   <div>

      <Grid item xs={12} sm={6} md={4}>
        <Background style={{ display: "flex" }}></Background>
      </Grid>
        <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src={ant} style={{ maxWidth: "100%", height: "auto", position: "absolute", left: "23%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }} alt="Ant" />
        <img src={grasshopper} style={{ maxWidth: "100%", height: "auto", position: "absolute", left: "75%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }} alt="Grasshopper" />
        <p style={{ position: "absolute", top: "6%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "7vw", zIndex: 3 }}>개미와 베짱이</p>
      </div>
   </div>
   
  );
};

export default StroyReady;
