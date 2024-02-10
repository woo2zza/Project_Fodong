// // import React, { useState } from "react";
// // import { searchNickname } from "../../api/friends";
// // import { userStore } from "../..//store/userStore";
// // import {
// //   Fab,
// //   Paper,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   TextField,
// //   Button,
// //   IconButton,
// //   Slide,
// // } from "@mui/material";
// // import {
// //   PersonAdd as PersonAddIcon,
// //   Close as CloseIcon,
// //   Delete as DeleteIcon,
// // } from "@mui/icons-material";

// // function Friends() {
// //   const [open, setOpen] = useState(false);
// //   const [nickname, setNickname] = useState("");
// //   const [friends, setFriends] = useState([]);
// //   const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 상태 추가

// //   const token = userStore((state) => state.token);
// //   console.log(token);
// //   // const handleSearch = async (event) => {
// //   //   setNickname((prev) => event.target.value);
// //   //   console.log(nickname);
// //   //   if (event.target.value.trim() !== "") {
// //   //     const res = await searchNickname(event.target.value, token);
// //   //     setSearchResults(res); // 검색 결과를 상태에 저장
// //   //   } else {
// //   //     setSearchResults([]); // 입력값이 없을 경우 검색 결과를 비움
// //   //   }
// //   // };

// //   const handleToggle = () => {
// //     setOpen(!open);
// //   };

// //   const handleAddFriend = (friend) => {
// //     if (friend) {
// //       setFriends([...friends, friend]);
// //       setSearchResults([]); // 친구 추가 후 검색 결과를 비움
// //       setNickname(""); // 입력 필드를 초기화
// //     }
// //   };

// //   const handleDeleteFriend = (index) => {
// //     const newFriends = [...friends];
// //     newFriends.splice(index, 1);
// //     setFriends(newFriends);
// //   };

// //   return (
// //     <div>
// //       <Fab
// //         color="primary"
// //         aria-label="add"
// //         style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1050 }} // Ensure FAB also has high z-index
// //         onClick={handleToggle}
// //       >
// //         <PersonAddIcon />
// //       </Fab>
// //       <Slide direction="up" in={open} mountOnEnter unmountOnExit>
// //         <Paper
// //           elevation={4}
// //           style={{
// //             position: "fixed",
// //             bottom: 80,
// //             right: 16,
// //             width: 300,
// //             maxHeight: "80%",
// //             overflow: "auto",
// //             padding: "16px",
// //             zIndex: 1050, // Set z-index to ensure it's on top
// //           }}
// //         >
// //           <IconButton
// //             aria-label="close"
// //             onClick={handleToggle}
// //             style={{ position: "absolute", right: 8, top: 8, zIndex: 1100 }} // Ensure close button is above the paper
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //           <List>
// //             {friends.map((friend, index) => (
// //               <ListItem
// //                 key={index}
// //                 secondaryAction={
// //                   <IconButton
// //                     edge="end"
// //                     aria-label="delete"
// //                     onClick={() => handleDeleteFriend(index)}
// //                     style={{ zIndex: 1100 }} // Ensure delete button is above the paper
// //                   >
// //                     <DeleteIcon />
// //                   </IconButton>
// //                 }
// //               >
// //                 <ListItemText primary={friend} />
// //               </ListItem>
// //             ))}
// //           </List>
// //           <TextField
// //             label="친구 추가"
// //             value={nickname}
// //             onChange={(e) => setNickname(e.target.value)}
// //             // onChange={(e) => handleSearch(e)}
// //             fullWidth
// //           />
// //           <Button
// //             onClick={() => handleAddFriend(nickname)}
// //             style={{ marginTop: 8 }}
// //           >
// //             추가
// //           </Button>
// //           <List>
// //             {searchResults.map((result, index) => (
// //               <ListItem
// //                 button
// //                 key={index}
// //                 onClick={() => handleAddFriend(result)}
// //               >
// //                 <ListItemText primary={result} />
// //               </ListItem>
// //             ))}
// //           </List>
// //         </Paper>
// //       </Slide>
// //     </div>
// //   );
// // }

// // export default Friends;

// import React, { useState, useEffect, useCallback } from "react";
// import { debounce } from "lodash";
// import { userStore } from "../../store/userStore";
// import { searchNickname, addFriends } from "../../api/friends";
// import { useSocket } from "../../contexts/SocketContext";
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
//   const [friends, setFriends] = useState([]); // friends rendering 처음 되었을 때 집어 넣어야 함
//   const [searchResults, setSearchResults] = useState([]);
//   const [showPopup, setShowPopup] = useState(false); // New state for controlling popup visibility
//   const [toProfileId, setToProfileId] = useState();

//   const token = userStore((state) => state.token);
//   const profileId = userStore((state) => state.profileId);

//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   // const handleAddFriend = () => {
//   //   const numbers = nickname.match(/\d+/g);
//   //   console.log(numbers);
//   //   // let toProfileId = null;
//   //   if (numbers) {
//   //     toProfileId = setToProfileId(parseInt(numbers.join(""), 10));
//   //   }
//   //   console.log(toProfileId);
//   //   const response = addFriends(profileId, toProfileId, token);
//   //   // 알림 보내는 요청
//   //   const response_sendRequest = sendFriendRequest();
//   //   console.log(response.data);
//   // };
//   const handleAddFriend = () => {
//     const numbers = nickname.match(/\d+/g);
//     if (numbers) {
//       const parsedToProfileId = parseInt(numbers.join(""), 10);
//       setToProfileId(parsedToProfileId); // 상태 업데이트, 비동기적으로 처리됨
//       console.log(parsedToProfileId);
//       sendFriendRequest(parsedToProfileId);
//       // 상태 업데이트 후 즉시 동작을 기대하므로, 여기서는 parsedToProfileId를 사용
//       const response = addFriends(profileId, parsedToProfileId, token);
//       // 알림 보내는 요청
//       // const response_sendRequest = sendFriendRequest(); // 이 부분은 아래와 같이 수정해야 합니다.
//       // sendFriendRequest(parsedToProfileId); // 함수를 수정하여 parsedToProfileId를 인자로 전달
//       console.log(response.data);
//     }
//   };

//   const handleDeleteFriend = (index) => {
//     const newFriends = [...friends];
//     newFriends.splice(index, 1);
//     setFriends(newFriends);
//   };

//   // lodash의 Debounce 함수를 사용하여 검색 로직을 감싸줍니다
//   // useCallback을 사용 => 컴포넌트가 리렌더링될 때마다 함수가 새로 생성되는 것을 방지
//   const debouncedSearch = useCallback(
//     debounce(async (nickname) => {
//       nickname = nickname.trim();
//       if (nickname.trim() !== "") {
//         const res = await searchNickname(nickname, token);
//         // res에 해당하는 nickname들의 리스트를 받음
//         console.log(res);
//         // const nicknames = res.map((item) => item.nickname);
//         // const profileIds = res.map((item) => item.profileId)
//         const searchResult = res.map(
//           (item) => `${item.nickname} #${item.profileId}`
//         );
//         console.log(searchResult);
//         setSearchResults(searchResult);
//         if (searchResult) {
//           setShowPopup(true);
//         }
//       } else {
//         setSearchResults([]);
//         setShowPopup(false);
//       }
//     }, 300),
//     [token]
//   );

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setNickname(value);
//     debouncedSearch(value);
//   };

//   // / **
//   // friends request 알림
//   const { stompClient } = useSocket();
//   // 아래 함수를 통해 알림이 감

//   const sendFriendRequest = (toProfileId) => {
//     if (stompClient) {
//       const friendRequest = {
//         fromProfileId: profileId,
//         toProfileId: toProfileId,
//       }; // 친구 요청 객체
//       // 서버로 친구 요청 메시지 전송
//       stompClient.send(
//         "/toServer/friend-request",
//         {},
//         JSON.stringify(friendRequest)
//       );
//       // .then((response) => console.log(response.data))
//       // .catch((err) => console.error(err));
//       console.log("Friend request sent:", friendRequest);
//     }
//   };

//   // // useEffect
//   // useEffect(() => {
//   //   // Ensure the stompClient is connected before subscribing
//   //   if (stompClient) {
//   //     const friendRequestSubscription = stompClient.subscribe(
//   //       "/toClient/friend-request",
//   //       (message) => {
//   //         const notification = JSON.parse(message.body);
//   //         console.log("Received friend request:", notification);
//   //         // Update your state or show a notification
//   //       }
//   //     );

//   // Clean up subscription on component unmount
//   //     return () => {
//   //       friendRequestSubscription.unsubscribe();
//   //     };
//   //   }
//   // }, [stompClient]);

//   // **/
//   return (
//     <div>
//       <Fab
//         color="primary"
//         aria-label="add"
//         style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1050 }}
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
//             zIndex: 1050,
//           }}
//         >
//           <IconButton
//             aria-label="close"
//             onClick={handleToggle}
//             style={{ position: "absolute", right: 8, top: 8, zIndex: 1100 }}
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
//                     style={{ zIndex: 1100 }}
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
//             onChange={handleSearch}
//             fullWidth
//           />
//           <Button onClick={handleAddFriend} style={{ marginTop: 8 }}>
//             추가
//           </Button>
//           {showPopup && (
//             <List
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 zIndex: 1200,
//                 backgroundColor: "white",
//                 maxHeight: 200,
//                 overflow: "auto",
//               }}
//             >
//               {searchResults.map((result, index) => (
//                 <ListItem
//                   button
//                   key={index}
//                   onClick={() => setNickname(result)}
//                 >
//                   <ListItemText primary={result} />
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Paper>
//       </Slide>
//     </div>
//   );
// }

// export default Friends;

import React, { useState, useEffect, useCallback } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function Friends() {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // toProfileId 상태는 삭제했습니다. 직접 필요한 곳에서 parsedToProfileId를 사용합니다.
  const [friendRequest, setFriendRequest] = useState(null); // 친구 요청 데이터 저장을 위한 상태

  const token = userStore((state) => state.token);
  const profileId = userStore((state) => state.profileId);
  const { stompClient } = useSocket(); // useSocket 훅에서 stompClient 가져오기

  const handleToggle = () => setOpen(!open);

  const handleAddFriend = () => {
    const numbers = nickname.match(/\d+/g);
    if (numbers) {
      const parsedToProfileId = parseInt(numbers.join(""), 10);
      console.log(parsedToProfileId);

      // sendFriendRequest 함수를 사용하여 친구 요청 메시지를 서버로 전송합니다.
      sendFriendRequest(parsedToProfileId);

      // addFriends 함수는 백엔드에 HTTP 요청을 보내는 것으로 추정됩니다.
      // 이 요청의 응답 처리가 필요하다면, 응답을 기다린 후 로그를 출력하거나 상태를 업데이트해야 합니다.
      addFriends(profileId, parsedToProfileId, token)
        .then((response) => {
          console.log(response.data);
          // 필요한 추가 처리 작업을 여기에 구현합니다.
        })
        .catch((error) => {
          console.error("친구 추가 요청 실패:", error);
        });
    }
  };

  // 서버로 친구 요청을 전송하는 함수
  const sendFriendRequest = (toProfileId) => {
    if (stompClient && toProfileId) {
      const friendRequest = {
        fromProfileId: profileId,
        toProfileId: toProfileId,
      };
      stompClient.send(
        "/toServer/friend-request",
        {},
        JSON.stringify(friendRequest)
      );
      console.log("Friend request sent:", friendRequest);
    }
  };

  // Debounce 함수를 사용하여 검색 로직 최적화
  const debouncedSearch = useCallback(
    debounce(async (nickname) => {
      if (nickname.trim() !== "") {
        const res = await searchNickname(nickname, token);
        const searchResult = res.map(
          (item) => `${item.nickname} #${item.profileId}`
        );
        console.log(searchResult);
        setSearchResults(searchResult);
        setShowPopup(searchResult.length > 0);
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

  const handleDeleteFriend = (index) => {
    const newFriends = [...friends];
    newFriends.splice(index, 1);
    setFriends(newFriends);
  };

  // 모달 관련 상태
  const [openModal, setOpenModal] = useState(false);

  // 모달 열기 함수
  const handleOpenModal = (request) => {
    setFriendRequest(request);
    setOpenModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setOpenModal(false);
    setFriendRequest(null); // 모달 닫을 때 친구 요청 데이터 초기화
  };

  // 친구 요청 수락 버튼 이벤트 핸들러
  // const handleAccept = () => {
  //   acceptFriendRequest(friendRequest.fromProfileId, token)
  //     .then((response) => {
  //       console.log("친구 요청 수락 성공:", response);
  //       // 성공 시 처리 로직, 예: 상태 업데이트나 알림 표시
  //     })
  //     .catch((error) => {
  //       console.error("친구 요청 수락 에러:", error);
  //     });
  // };

  const handleAccept = () => {
    const friendRequest = {
      fromProfileId: profileId,
      toProfileId: friendRequest.toProfileId,
      action: "accept",
    };

    // WebSocket을 통해 서버로 전송
    stompClient.send(
      "/toServer/friend-request",
      {},
      JSON.stringify(friendRequest)
    );
  };

  // 친구 요청 거절 버튼 이벤트 핸들러
  // const handleReject = () => {
  //   rejectFriendRequest(friendRequest.fromProfileId, token)
  //     .then((response) => {
  //       console.log("친구 요청 거절 성공:", response);
  //       // 성공 시 처리 로직, 예: 상태 업데이트나 알림 표시
  //     })
  //     .catch((error) => {
  //       console.error("친구 요청 거절 에러:", error);
  //     });
  // };

  const handleReject = () => {
    const friendRequest = {
      fromProfileId: profileId,
      toProfileId: friendRequest.toProfileId,
      action: "reject",
    };

    // WebSocket을 통해 서버로 전송
    stompClient.send(
      "/toServer/friend-request",
      {},
      JSON.stringify(friendRequest)
    );
  };

  // useEffect
  // useEffect(() => {
  //   // Ensure the stompClient is connected before subscribing
  //   if (stompClient) {
  //     const friendRequestSubscription = stompClient.subscribe(
  //       "/toClient/friend-request-response",
  //       (message) => {
  //         const notification = JSON.parse(message.body);
  //         console.log("Received friend request:", notification);
  //         // Update your state or show a notification

  //         alert(notification.message);
  //       }
  //     );

  //     //   Clean up subscription on component unmount
  //     return () => {
  //       friendRequestSubscription.unsubscribe();
  //     };
  //   }
  // }, [stompClient]);
  // useEffect 내 친구 요청 수신 로직 수정...
  useEffect(() => {
    if (stompClient) {
      const friendRequestSubscription = stompClient.subscribe(
        "/toClient/friend-request-response",
        (message) => {
          const notification = JSON.parse(message.body);
          // 친구 요청이 현재 사용자에게 온 것인지 확인합니다.
          if (notification.toProfileId === profileId) {
            handleOpenModal(notification); // 조건이 맞을 때만 모달을 열어 표시
          } else {
            console.log("Received friend request not for me:", notification);
          }
        }
      );

      return () => {
        friendRequestSubscription.unsubscribe();
      };
    }
  }, [stompClient, profileId]); // profileId 의존성 추가

  // UI 렌더링 부분...
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

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>친구 요청</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {friendRequest
              ? `${friendRequest.fromNickname}님으로부터 친구 요청이 왔습니다.`
              : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} autoFocus>
            수락
          </Button>
          <Button onClick={handleReject}>거절</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Friends;
