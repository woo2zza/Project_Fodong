import React, { useState, useEffect } from "react";
import "./mainStyle.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}`;
function App() {
  const [viewMode, setViewMode] = useState("listView");
  const [profiles, setProfiles] = useState([]);
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    axios
      .get(`${API_BASE_URL}/books`, config)
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error("서버 요청 실패:", error);
      });
  };

  return (
    <div>
      <div className="viewSwitcher">
        <input
          type="radio"
          name="viewSwitcher"
          id="listView"
          value="listView"
          checked={viewMode === "listView"}
          onChange={() => setViewMode("listView")}
        />
        <label htmlFor="listView">List</label>

        <input
          type="radio"
          name="viewSwitcher"
          id="gridView"
          value="gridView"
          checked={viewMode === "gridView"}
          onChange={() => setViewMode("gridView")}
        />
        <label htmlFor="gridView">Grid</label>
      </div>

      <section className={`viewPaper viewShadowLarge ${viewMode}`}>
        <ul className={`cardListView ${viewMode}`}>
          {profiles.map((profile) => (
            <li key={profile.bookId} className="cardItem">
              <h2>{profile.title}</h2>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
