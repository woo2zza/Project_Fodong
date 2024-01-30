import React, { useState } from "react";
import dummy from "./dummy";

const Character = () => {
  const [players, setPlayers] = useState(dummy);

  // useEffect(() => {setPlayers(dummy[0].player)});

  const assignRole = (playerName, role) => {
    const updatePlayers = players.map((player) =>
      player.player === playerName ? { ...player, role: role } : player
    );
    setPlayers(updatePlayers);
    console.log(updatePlayers);
  };
  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <img
        src={require("./img/ant1.png")}
        style={{ maxWidth: "35%", height: "24vh", marginLeft: "15px", marginRight: "15px" }}
        alt="일하는돼지"
        onClick={() => assignRole("", "일하는돼지")}
      />
      <img
        src={require("./img/베짱이3.png")}
        style={{ maxWidth: "35%", height: "24vh" }}
        alt="돼지"
        onClick={() => assignRole("person2", "돼지")}
      />
    </div>
  );
};

export default Character;
