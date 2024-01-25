import React from "react";
import Cams from "../components/Cams";
import Script from "../components/storyTelling/Script";
import Page1 from "../components/storyTelling/Page1";

import { Route, Routes } from "react-router-dom";

// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const StoryTelling = () => {
  return (
    <>
      <main>
        <section>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Routes>
                <Route path="/:page" element={<Page1 />} />
              </Routes>
            </Grid>
            <Grid xs={4}>
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
