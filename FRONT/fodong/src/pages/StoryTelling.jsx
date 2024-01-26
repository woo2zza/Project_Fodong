import React from "react";
import Cams from "../components/storyTelling/Cams";
import Script from "../components/storyTelling/Script";
import Page1 from "../components/storyTelling/Page1";
import { Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";

const StoryTelling = () => {
  return (
    <>
      <main style={mainStyle}>
        <section>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Routes>
                <Route path="/:page" element={<Page1 />} />
              </Routes>
            </Grid>
            <Grid item xs={12} md={4}>
              <Cams style={script} />
            </Grid>
          </Grid>
        </section>
        <section>
          <Routes>
            <Route path="/:page" element={<Script />} />
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
