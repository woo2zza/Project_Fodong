import React, { useState } from "react";
// import Cams from "../components/storyTelling/Cams";
import Script from "../components/storyTelling/Script";
import Page1 from "../components/storyTelling/Page1";
import { Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";
import storyStore from "../store/storyStore";

const StoryTelling = () => {
  const data = storyStore((state) => state.data)
  console.log(data);
  const [scriptPage, setScriptPage] = useState(0);

  // const handlePageChange = () => {
  //   setScriptPage(0);
  // };

  // if (loading) {
  //   return <div>Loading ...</div>
  // }
  // return (
  //   <div>
  //     {data
  //     .filter(({ pageNo }) => pageNo === currentPageno)
  //     .map(({ characterImg, characterName}, index) => (
  //       <div key={index}>
  //         <img src={characterImg} alt={characterName} />
  //       </div>
  //     ))
      // }
    // </div>
    // <>
    //   <section>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12}>
    //         <Routes>
    //           <Route
    //             path="/:page"
    //             element={<Page1 onPageChange={handlePageChange} />}
    //           />
    //         </Routes>
    //       </Grid>
    //       {/* <Grid item xs={12} md={4}>
    //           <Cams style={script} />
    //         </Grid> */}
    //     </Grid>
    //   </section>
    //   <section className="script-container" style={{ height: "15vh" }}>
    //     <Routes>
    //       <Route
    //         path="/:page"
    //         element={
    //           <Script scriptPage={scriptPage} setScriptPage={setScriptPage} />
    //         }
    //       />
    //     </Routes>
    //   </section>
    // </>
  // );
};

const mainStyle = {
  padding: "100px",
  backgroundColor: "#f0e68c",
  height: "100vh",
};

const script = {
  border: "1px solid ",
  margin: "2%",
  maxWidth: "100%",
  borderRadius: "18px",
};

export default StoryTelling;
