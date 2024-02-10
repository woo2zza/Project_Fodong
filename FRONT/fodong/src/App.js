import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bookshelf from "./pages/bookshelf";
import BookList from "./pages/BookList";
import StoryTelling from "./pages/StoryTelling";
import Album from "./pages/Album";
import Main from "./pages/Main";
import Book from "./pages/Book";
import ReadBook from "./pages/ReadBook";
import Profile from "./pages/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StroyReady from "./pages/StroyReady.jsx";
import Face from "./components/face/Face.jsx";
import WebSocketTest from "./components/sockettest/WebSocketTest";
import { SocketProvider } from "./contexts/SocketContext";
import StoryDetail from "./components/StoryDetail";
import Test from "./webrtc/TestRecording.jsx";

function App() {
  return (
      <SocketProvider>
        <BrowserRouter basename="/fodong">
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/" element={<Login />} />
            <Route path="/storytelling/*" element={<StoryTelling />} />
            <Route path="/signup/" element={<Signup />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/bookshelf/" element={<Bookshelf />} />
            <Route path="/booklist/" element={<BookList />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/storyready/*" element={<StroyReady />} />
            <Route path="/storyDetail" element={<StoryDetail />} />
            {/*<Route path="/face/*" element={<Face />} />*/}                {/*자꾸 뻑나서 주석처리했음*/}
            <Route path="/album/" element={<Album />} />
            <Route path="/readBook/" element={<ReadBook />} />
            {/* test용 */}
            {/*<Route path="/test/" element={<Test />} />*/} {/*자꾸 뻑나서 주석처리했음*/}
            <Route path="/sockettest" element={<WebSocketTest />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
  );
}

export default App;