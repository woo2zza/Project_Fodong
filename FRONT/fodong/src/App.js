import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebRTC from "./webRTC_chh/testWebRTC";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/webrtc" element={<WebRTC />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
