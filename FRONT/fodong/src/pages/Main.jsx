import React, { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import DropdownButton from "../components/main/DropdownButton"; // Import the new component
import Buttons from "../components/main/buttons";
import ScrollBook from "../components/main/scrollBook";
import Title from "../components/main/Title";
import FreindsToggler from "../components/main/Friends";

// import { userStore } from "../store/userStore";

import "./pages.css";
// Main 컴포넌트

<click-spark></click-spark>;
const Main = () => {
  // 진명, 소켓연결 추가한 부분 확인필요
  const { stompClient, connect, disconnect, sessionId, isGameAccepted } =
    useSocket();

  useEffect(() => {
    connect();
  }, [connect, disconnect]);
  //////////////////////////////////////

  const Navi = useNavigate();
  useEffect(() => {
    console.log("두번째 ");

    if (sessionId && isGameAccepted) {
      Navi(`/multi/${sessionId}`);
    }
  }, [sessionId, isGameAccepted, Navi]);
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
