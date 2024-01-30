import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div>
      <Link to="/">
        <img src={require(`./img/back.png`)} alt="startbutton" style={{marginTop: '10', maxWidth: '100px', maxHeight: '100px'}} />
      </Link>
    </div>
  );
};

export default BackButton;
