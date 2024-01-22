import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Fantasy Tale</h1>
          <Routes>
            <Route path="Login/" element={<Login />} />
            <Route path="Signup/" element={<Signup />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
