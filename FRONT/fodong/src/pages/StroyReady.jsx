import React from "react";
import { Route, Routes } from "react-router-dom";
import Background from "../components/storyReady/Background";
import Character from "../components/storyReady/Character";
import StartButton from "../components/storyReady/StartButton";

const StroyReady = () => {
  console.log(1111);
  return (
    <main>
      <div>
        <Background style={{ display: "flex" }}></Background>
      </div>
      <div style={{ display: "flex", width: "100%", height: "100%"}}>
        <Character style={{ flex: 1, minWidth: "50%"}}></Character>
        <StartButton style={{ flex: 1, minWidth: "50%"}}></StartButton>
      </div>
    </main>
  );
};

export default StroyReady;
