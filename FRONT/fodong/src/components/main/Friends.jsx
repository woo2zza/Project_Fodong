// import React, { useState } from "react";
// import { searchNickname } from "../../api/friends";
// import { userStore } from "../..//store/userStore";
// import {
//   Fab,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Button,
//   IconButton,
//   Slide,
// } from "@mui/material";
// import {
//   PersonAdd as PersonAddIcon,
//   Close as CloseIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";

// function Friends() {
//   const [open, setOpen] = useState(false);
//   const [nickname, setNickname] = useState("");
//   const [friends, setFriends] = useState([]);
//   const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 상태 추가

//   const token = userStore((state) => state.token);
//   console.log(token);
//   // const handleSearch = async (event) => {
//   //   setNickname((prev) => event.target.value);
//   //   console.log(nickname);
//   //   if (event.target.value.trim() !== "") {
//   //     const res = await searchNickname(event.target.value, token);
//   //     setSearchResults(res); // 검색 결과를 상태에 저장
//   //   } else {
//   //     setSearchResults([]); // 입력값이 없을 경우 검색 결과를 비움
//   //   }
//   // };

//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   const handleAddFriend = (friend) => {
//     if (friend) {
//       setFriends([...friends, friend]);
//       setSearchResults([]); // 친구 추가 후 검색 결과를 비움
//       setNickname(""); // 입력 필드를 초기화
//     }
//   };

//   const handleDeleteFriend = (index) => {
//     const newFriends = [...friends];
//     newFriends.splice(index, 1);
//     setFriends(newFriends);
//   };

//   return (
//     <div>
//       <Fab
//         color="primary"
//         aria-label="add"
//         style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1050 }} // Ensure FAB also has high z-index
//         onClick={handleToggle}
//       >
//         <PersonAddIcon />
//       </Fab>
//       <Slide direction="up" in={open} mountOnEnter unmountOnExit>
//         <Paper
//           elevation={4}
//           style={{
//             position: "fixed",
//             bottom: 80,
//             right: 16,
//             width: 300,
//             maxHeight: "80%",
//             overflow: "auto",
//             padding: "16px",
//             zIndex: 1050, // Set z-index to ensure it's on top
//           }}
//         >
//           <IconButton
//             aria-label="close"
//             onClick={handleToggle}
//             style={{ position: "absolute", right: 8, top: 8, zIndex: 1100 }} // Ensure close button is above the paper
//           >
//             <CloseIcon />
//           </IconButton>
//           <List>
//             {friends.map((friend, index) => (
//               <ListItem
//                 key={index}
//                 secondaryAction={
//                   <IconButton
//                     edge="end"
//                     aria-label="delete"
//                     onClick={() => handleDeleteFriend(index)}
//                     style={{ zIndex: 1100 }} // Ensure delete button is above the paper
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 }
//               >
//                 <ListItemText primary={friend} />
//               </ListItem>
//             ))}
//           </List>
//           <TextField
//             label="친구 추가"
//             value={nickname}
//             onChange={(e) => setNickname(e.target.value)}
//             // onChange={(e) => handleSearch(e)}
//             fullWidth
//           />
//           <Button
//             onClick={() => handleAddFriend(nickname)}
//             style={{ marginTop: 8 }}
//           >
//             추가
//           </Button>
//           <List>
//             {searchResults.map((result, index) => (
//               <ListItem
//                 button
//                 key={index}
//                 onClick={() => handleAddFriend(result)}
//               >
//                 <ListItemText primary={result} />
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </Slide>
//     </div>
//   );
// }

// export default Friends;

import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import { userStore } from "../../store/userStore";
import { searchNickname, addFriends } from "../../api/friends";
import { useSocket } from "../../contexts/SocketContext";
import {
  Fab,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Slide,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function Friends() {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [friends, setFriends] = useState([]); // friends rendering 처음 되었을 때 집어 넣어야 함
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // New state for controlling popup visibility
  const [toProfileId, setToProfileId] = useState();

  const token = userStore((state) => state.token);
  const profileId = userStore((state) => state.profileId);
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleAddFriend = () => {
    const numbers = nickname.match(/\d+/g);
    console.log(numbers);
    // let toProfileId = null;
    if (numbers) {
      toProfileId = setToProfileId(parseInt(numbers.join(""), 10));
    }
    console.log(toProfileId);
    const response = addFriends(profileId, toProfileId, token);
    // 알림 보내는 요청
    const response_sendRequest = sendFriendRequest();
    console.log(response.data);
  };

  const handleDeleteFriend = (index) => {
    const newFriends = [...friends];
    newFriends.splice(index, 1);
    setFriends(newFriends);
  };

  // lodash의 Debounce 함수를 사용하여 검색 로직을 감싸줍니다
  // useCallback을 사용 => 컴포넌트가 리렌더링될 때마다 함수가 새로 생성되는 것을 방지
  const debouncedSearch = useCallback(
    debounce(async (nickname) => {
      nickname = nickname.trim();
      if (nickname.trim() !== "") {
        const res = await searchNickname(nickname, token);
        // res에 해당하는 nickname들의 리스트를 받음
        console.log(res);
        // const nicknames = res.map((item) => item.nickname);
        // const profileIds = res.map((item) => item.profileId)
        const searchResult = res.map(
          (item) => `${item.nickname} #${item.profileId}`
        );
        console.log(searchResult);
        setSearchResults(searchResult);
        if (searchResult) {
          setShowPopup(true);
        }
      } else {
        setSearchResults([]);
        setShowPopup(false);
      }
    }, 300),
    [token]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setNickname(value);
    debouncedSearch(value);
  };

  // friends request 알림
  const { stompClient } = useSocket();
  // 아래 함수를 통해 알림이 감
  const sendFriendRequest = () => {
    if (stompClient && toProfileId) {
      const friendRequest = { toProfileId }; // 친구 요청 객체
      stompClient.send(
        "/toServer/friend-request",
        {},
        JSON.stringify(friendRequest)
      ); // 서버로 친구 요청 메시지 전송
      console.log("Friend request sent:", friendRequest);
    }
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1050 }}
        onClick={handleToggle}
      >
        <PersonAddIcon />
      </Fab>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={4}
          style={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: 300,
            maxHeight: "80%",
            overflow: "auto",
            padding: "16px",
            zIndex: 1050,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleToggle}
            style={{ position: "absolute", right: 8, top: 8, zIndex: 1100 }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {friends.map((friend, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteFriend(index)}
                    style={{ zIndex: 1100 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={friend} />
              </ListItem>
            ))}
          </List>
          <TextField
            label="친구 추가"
            value={nickname}
            onChange={handleSearch}
            fullWidth
          />
          <Button onClick={handleAddFriend} style={{ marginTop: 8 }}>
            추가
          </Button>
          {showPopup && (
            <List
              style={{
                position: "absolute",
                width: "100%",
                zIndex: 1200,
                backgroundColor: "white",
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              {searchResults.map((result, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => setNickname(result)}
                >
                  <ListItemText primary={result} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Slide>
    </div>
  );
}

export default Friends;
