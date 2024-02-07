import React from "react";
// import { Route, Routes } from "react-router-dom";
import Background from "../components/storyReady/Background";
import Character from "../components/storyReady/Character";
import StartButton from "../components/storyReady/StartButton";
import BackButton from "../components/storyReady/BackButton";
import { Grid } from "@mui/material";

const StroyReady = () => {
  console.log(1111);
  const sources = [
    "./img/antstory/character/grasshopper/grasshoper2.png",
    "./img/antstory/character/ant/3.png",
  ];
  return (
    // <Grid container spacing={2}>
    //   <Grid item xs={12} sm={6} md={4}>
    //     <Background style={{ display: "flex" }}></Background>
    //   </Grid>
    //   <Grid
    //     style={{
    //       display: "flex",
    //       width: "100%",
    //       height: "30vh",
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //       padding: "0 15px",
    //     }}
    //   >
    //     {/* <BackButton style={{ flex: 1, minWidth: "50%" }} /> */}
    //     <Character
    //       style={{
    //         flex: 1,
    //         minWidth: "calc(100% - 100px)",
    //         justifyContent: "center",
    //       }}
    //     />
    //     <StartButton style={{ flex: 1, minWidth: "50%" }} />
    //   </Grid>
    // </Grid>
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      style={{ width: "100%" }} // 명시적 너비 설정
    >
      <Grid item style={{ flexGrow: 1 }}>
        <Background />
      </Grid>
      <Grid
        container
        item
        spacing={2}
        style={{ flexGrow: 1, margin: "0.5rem 0 0 0" }}
      >
        <Grid item style={{ flexGrow: 1 }}>
          {sources.map((src, idx) => (
            <Character src={src} key={idx} />
          ))}
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <p
            style={{
              display: "flex",

              alignItems: "center",
              height: "100%",
              fontSize: "3rem",
            }}
          >
            베짱이는 화면의 왼쪽에,
            <br /> 개미는 화면의 오른쪽에 위치해 주세요!
          </p>
        </Grid>
        <Grid item style={{ flexGrow: 1 }} columns={1}>
          <StartButton />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StroyReady;
