import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebRTC from "./webRTC_chh/testWebRTC";
import Rtc from "./webrtc/Rtc";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/webrtc" element={<WebRTC />} />
        </Routes>
      </Router>

      <Rtc />
    </div>
  );
}

export default App;
