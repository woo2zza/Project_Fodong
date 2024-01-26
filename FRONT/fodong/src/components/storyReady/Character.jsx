import React, { useState, useEffect } from "react";
import dummy from "./dummy";

const Character = () => {
  const [players, setPlayers] = useState(dummy);

  useEffect(() => {setPlayers(dummy[0].player)});

  const assignRole = (playerName, role) => {
    const updatePlayers = players.map((player) =>
      player.player === playerName ? { ...player, role: role } : player
    );
    setPlayers(updatePlayers);
    console.log(updatePlayers);
  };
  
  return (
    <div>
      <img
        src={require("./img/pig3-work.png")}
        style={{ maxWidth: "35%", height: "24vh" }}
        alt="일하는돼지"
        onClick={() => assignRole("", "일하는돼지")}
      />
      <img
        src={require("./img/pig3.png")}
        style={{ maxWidth: "35%", height: "24vh" }}
        alt="돼지"
        onClick={() => assignRole("person2", "돼지")}
      />
    </div>
  );
};

export default Character;
