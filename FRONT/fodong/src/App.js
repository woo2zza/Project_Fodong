import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bookshelf from "./pages/bookshelf";
import BookList from "./pages/BookList";
import StoryTelling from "./pages/StoryTelling";
import Main from "./pages/Main";
import Book from "./pages/Book";
import WebRTC from "./webRTC_chh/testWebRTC.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StroyReady from "./pages/StroyReady.jsx";
function App() {
  return (

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login/" element={<Login />} />
            <Route path="storytelling/*" element={<StoryTelling />} />
            <Route path="signup/" element={<Signup />} />
            <Route path="bookshelf/" element={<Bookshelf />} />
            <Route path="booklist/" element={<BookList />} />
            <Route path="book/:id" element={<Book />} />
            <Route path="/webrtc" element={<WebRTC />} />
            <Route path="/storyready/*" element={<StroyReady />} />
          </Routes>
        </BrowserRouter>
    
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Main />} />
//         <Route path="login/" element={<Login />} />
//         <Route path="storytelling/*" element={<StoryTelling />} />
//         <Route path="signup/" element={<Signup />} />
//         <Route path="bookshelf/" element={<Bookshelf />} />
//         <Route path="booklist/" element={<BookList />} />
//         <Route path="book/:id" element={<Book />} />
//         <Route path="/webrtc" element={<WebRTC />} />
//       </Routes>
//     </BrowserRouter>
// >>>>>>> fccf0acb779f996ae0549f1e19a0fcee1cb6eec4
  );
}

export default App;
