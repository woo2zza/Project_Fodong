import React from "react";
// import { Route, Routes } from "react-router-dom";
import Background from "../components/storyReady/Background";
import Character from "../components/storyReady/Character";
// import StartButton from "../components/storyReady/StartButton";
import BackButton from "../components/storyReady/BackButton";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import storyStore from "../store/storyStore";


const StroyReady = () => {
  const navigate = useNavigate();
  const fetchData = storyStore((state) => state.fetchData)
  console.log(1111);
  const sources = [
    "./img/antstory/character/grasshopper/grasshoper2.png",
    "./img/antstory/character/ant/3.png",
  ];

  

    const handleClick = async () => {
      
      await fetchData();
      navigate("/storytelling");
    }
  

  return (
    
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
          <button onClick={handleClick}>동화 시작</button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StroyReady;
