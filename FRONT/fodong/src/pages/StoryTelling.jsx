import React, { useState } from "react";
// import Cams from "../components/storyTelling/Cams";
import Script from "../components/storyTelling/Script";
import Page1 from "../components/storyTelling/Page1";
import { Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";



const StoryTelling = () => {
  const [scriptPage, setScriptPage] = useState(0);
  
  
  const handlePageChange = () => {
  setScriptPage(0);
  }
  return (
    <>
      <main style={mainStyle}>
        <section>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Routes>
                <Route path="/:page" element={<Page1  onPageChange = {handlePageChange} />} />
                
              </Routes>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <Cams style={script} />
            </Grid> */}
          </Grid>
        </section>
        <section>
          <Routes>
            <Route path="/:page" element={<Script scriptPage={ scriptPage } setScriptPage={ setScriptPage }/>} />
          </Routes>
        </section>
      </main>
    </>
  );
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
