import React, { useState } from "react";
import { userStore } from "../../store/userStore";
function App() {
  const [viewMode, setViewMode] = useState("listView");
  const profileId = userStore((state) => state.profileId);
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
        <label htmlFor="gridView">
          {/* SVG for grid view */}
          Grid
        </label>
      </div>

      <section className={`viewPaper viewShadowLarge ${viewMode}`}>
        <h1>From our Site {profileId}</h1>
        {/* profileId 값을 직접 출력 */}
        <div>Profile ID: {profileId}</div>
        <ul className={`cardListView ${viewMode}`}>
          {/* 리스트 아이템을 추가 */}
        </ul>
      </section>
      <ul className={`cardListView ${viewMode}`}>
        {/* 여기에 리스트 아이템을 추가 */}
      </ul>
    </div>
  );
}

export default App;
