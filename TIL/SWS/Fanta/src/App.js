import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signup/" element={<Signup />} />
            <Route path="mypage/" element={<Mypage />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
