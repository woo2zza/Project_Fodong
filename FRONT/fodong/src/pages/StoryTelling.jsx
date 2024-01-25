import React from "react";
import Cams from "../components/Cams";
import Script from "../components/storyTelling/Script";
import Page1 from "../components/storyTelling/Page1";
import { Route, Routes } from "react-router-dom";
import Grid from "@mui/material/Grid";

const StoryTelling = () => {
  return (
    <>
      <main>
        <section>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Routes>
                <Route path="/:page" element={<Page1 />} />
              </Routes>
            </Grid>
            <Grid item xs={12} md={4}>
              <Cams />
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

export default StoryTelling;
