import React, { useState, useEffect } from "react";
import fetchProfiles from "../../api/profile_api";
import Chick from "./img/chick.png";
import "./profileStyle.css";
function App() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchProfiles()
      .then((response) => {
        setProfile(response.data);
        console.log(profile);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  return (
    <div className="profileContainer">
      {profile.map((item) => (
        <NumberCard
          key={item.profileId}
          number={item.profileId}
          nickname={item.nickname}
        />
      ))}
    </div>
  );
}

function NumberCard({ number, nickname }) {
  return (
    <div className="card">
      <h3>Number: {number}</h3>
      <img src={Chick} alt="" className="profileImage" />
      <p className="profileText">닉네임은 {nickname}입니다.</p>
    </div>
  );
}

export default App;
