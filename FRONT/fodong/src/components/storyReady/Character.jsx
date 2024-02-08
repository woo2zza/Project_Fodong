import React, { useState, useEffect } from "react";
// import dummy from "./dummy";
import { character } from "../../api/character";

const Character = ({ src }) => {
  // 실행된는 index.html 기준 (아래 코드에서)
  // console.log(src);
  const [imageData, setImageData] = useState(src);
  // const [players, setPlayers] = useState(dummy);

  //   useEffect(() => {
  //     character(imageUrl)
  //     .then((data) => {
  //       setImageData(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }, [imageUrl]);

  // const assignRole = (playerName, role) => {
  //   const updatePlayers = players.map((player) =>
  //     player.player === playerName ? { ...player, role: role } : player
  //   );
  //   setPlayers(updatePlayers);
  //   console.log(updatePlayers);
  // };
  // console.log(imageData);

  return (
    // <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
    //   <img
    //     src={require("./img/ant1.png")}
    //     style={{ maxWidth: "35%", height: "24vh", marginLeft: "15px", marginRight: "15px" }}
    //     alt="일하는돼지"
    //     onClick={() => assignRole("", "일하는돼지")}
    //   />
    //   <img
    //     src={require("./img/베짱이3.png")}
    //     style={{ maxWidth: "35%", height: "24vh" }}
    //     alt="돼지"
    //     onClick={() => assignRole("person2", "돼지")}
    //   />
    // </div>
    <span style={{ margin: "0 0.5rem" }}>
      <img width="100vh" height="100vh" src={imageData} alt="이미지" />
    </span>
  );
};

export default Character;
