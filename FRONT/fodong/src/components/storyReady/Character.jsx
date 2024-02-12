import React, { useState, useEffect } from "react";
// import dummy from "./dummy";
import ant from "./img/1.jpg";
import grasshopper from "./img/grasshoper2.png";

const Character = () => {
  

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>

    <img src={ant} style={{ maxWidth: "100%", height: "auto", position: "absolute", left: "23%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }} alt="Ant" />
    <img src={grasshopper} style={{ maxWidth: "100%", height: "auto", position: "absolute", left: "75%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }} alt="Ant" />
    <p style={{ position: "absolute", top: "6%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "7vw", zIndex: 3 }}>개미와 베짱이</p>
       </div>
  );
};

export default Character;
