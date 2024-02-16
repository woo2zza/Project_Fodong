import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { userStore } from "../../store/userStore";
import { searchNickname, addFriends, getFriends } from "../../api/friends";
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

  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // toProfileId 상태는 삭제했습니다. 직접 필요한 곳에서 parsedToProfileId를 사용합니다.
  const [friendRequest, setFriendRequest] = useState(null); // 친구 요청 데이터 저장을 위한 상태
  // const [requestedProfiles, setRequestedProfiles] = useState([]); // 이미 친구 요청을 보낸 프로필 ID들을 저장할 상태

  const token = userStore((state) => state.token);
  const profileId = userStore((state) => state.profileId);
  // console.log(profileId);
  const { stompClient } = useSocket(); // useSocket 훅에서 stompClient 가져오기
  const [friends, setFriends] = useState([]);
  const handleToggle = () => setOpen(!open);

  const handleAddFriend = (event) => {
    console.log("요청 몇번가는지 handleAddFriend");
    event.preventDefault();
    const numbers = nickname.match(/\d+/g);
    if (numbers) {
      const parsedToProfileId = parseInt(numbers.join(""), 10);
      console.log(parsedToProfileId);

      // sendFriendRequest 함수를 사용하여 친구 요청 메시지를 서버로 전송합니다.
      // 요게 STOMP 구독인듯?
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
      const requestPayload = {
        fromProfileId: profileId,
        toProfileId: toProfileId,
        action: "sendRequest",
      };
      stompClient.send(
        "/toServer/friend-request",
        {},
        JSON.stringify(requestPayload)
      );
      console.log("Friend request sent:", requestPayload);
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
    // setFriendRequest((prev) => request);
    // setOpenModal((prev) => true);
    setFriendRequest(request);
    setOpenModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setOpenModal(false);
    setFriendRequest(null); // 모달 닫을 때 친구 요청 데이터 초기화
  };

  const handleAccept = () => {
    const requestPayload = {
      fromProfileId: profileId,
      toProfileId: friendRequest.fromProfileId,
      action: "accept",
    };
    // WebSocket을 통해 서버로 전송
    stompClient.send(
      "/toServer/friend-request",
      {},
      JSON.stringify(requestPayload)
    );
    handleCloseModal();
  };

  const handleReject = () => {
    const requestPayload = {
      fromProfileId: profileId,
      toProfileId: friendRequest.fromProfileId,
      action: "reject",
    };

    // WebSocket을 통해 서버로 전송
    stompClient.send(
      "/toServer/friend-request",
      {},
      JSON.stringify(requestPayload)
    );
    handleCloseModal();
  };

  // useEffect 내 친구 요청 수신 로직 수정...
  useEffect(() => {
    if (stompClient) {
      console.log("여기 맞음");
      const friendRequestSubscription = stompClient.subscribe(
        "/toClient/friend-request-response",
        (message) => {
          const notification = JSON.parse(message.body);
          // 친구 요청이 현재 사용자에게 온 것인지 확인합니다.
          if (
            notification.action === "sendRequest" &&
            notification.toProfileId === profileId
          ) {
            const requestInfo = {
              fromProfileId: notification.fromProfileId,
              toProfileId: notification.toProfileId,
              message: notification.message,
              fromNickname: notification.fromNickname,
              toNickname: notification.toNickname,
            };
            handleOpenModal(requestInfo);
          } else if (notification.action === "accept") {
            setFriends((prev) => {
              // 새 친구의 닉네임을 확인합니다.
              const newFriendNickname =
                profileId === notification.fromProfileId
                  ? notification.toNickname
                  : notification.fromNickname;
              // 이미 친구 목록에 존재하는지 확인합니다.
              if (
                prev.some((friend) => friend.nickname === newFriendNickname)
              ) {
                return prev; // 이미 존재하면 목록을 변경하지 않습니다.
              } else {
                // 새로운 친구를 목록에 추가합니다.
                return [
                  ...prev,
                  {
                    nickname: newFriendNickname,
                    profileId:
                      profileId === notification.fromProfileId
                        ? notification.toProfileId
                        : notification.fromProfileId,
                  },
                ];
              }
            });
          } else {
            console.log("Received friend request not for me:", notification);
          }
          console.log(notification);
        }
      );

      return () => {
        friendRequestSubscription.unsubscribe();
      };
    }
  }, [stompClient, profileId, friends]); // profileId 의존성 추가

  // 이 부분 고쳐야 해!!
  useEffect(() => {
    const fetchFriends = async () => {
      const friendsData = await getFriends(profileId, token);
      setFriends(friendsData.filter((friend, idx) => idx % 2 === 0));
      console.log(friends);
    };

    fetchFriends();
  }, [stompClient]);

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
        <paper
          className="Paper"
          elevation={4}
          style={{
            position: "fixed",
            bottom: 100,
            right: 50,
            height: 400,
            width: 330,
            maxHeight: "80%",
            overflow: "auto",
            padding: "20px",
            zIndex: 1050,
            boxShadow: "0px 14px 16px rgba(0, 0, 0, 0.5)",
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
                className="ListItem"
                key={friend.profileId}
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
                <ListItemText primary={friend.nickname} />
              </ListItem>
            ))}
          </List>
          <TextField
            className="TextField"
            label="친구 추가"
            value={nickname}
            onChange={handleSearch}
            fullWidth
          />
          <button
            className="Friend-button"
            onClick={handleAddFriend}
            style={{ marginTop: 8 }}
          >
            추가
          </button>
          {showPopup && (
            <List
              className="friend-item"
              style={{
                position: "absolute",
                width: "100%",
                zIndex: 1200,
                maxHeight: 200,
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
        </paper>
      </Slide>

      <Dialog className="Dialog" open={openModal} onClose={handleCloseModal}>
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
