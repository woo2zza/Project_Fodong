import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookSelf from "./pages/BookSelf";
import BookList from "./pages/BookList";
import StoryTelling from "./pages/StoryTelling";
import Main from "./pages/Main";
import Book from "./pages/Book";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login/" element={<Login />} />
            <Route path="storytelling/*" element={<StoryTelling />} />
            <Route path="signup/" element={<Signup />} />
            <Route path="bookself/" element={<BookSelf />} />
            <Route path="booklist/" element={<BookList />} />
            <Route path="book/:id" element={<Book />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
