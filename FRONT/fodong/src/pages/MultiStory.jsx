import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFriends } from "../api/friends.js";
import { userStore } from "../store/userStore";
import { multiStoryStore } from "../store/multiStoryStore";
import { getFriendEmail } from "../api/friends.js";
import { useSocket } from "../contexts/SocketContext.js";
import {
  MultiStoryProvider,
  useMultiStoryContext,
} from "../contexts/MultiStoryContext.js";
import StoryRoom from "../components/multi/StoryRoom";
import Img from "../img/storyready.png";
import {
  Button,
  Avatar,
  IconButton,
  // Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
  // ListItemIcon,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import {
  AddCircleOutline,
  CheckCircleOutline,
  PeopleAlt,
} from "@mui/icons-material";

const characters = [
  {
    id: 1,
    name: "개미",
    image:
      "data:image/png;base64,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",
  },
  {
    id: 2,
    name: "베짱이",
    image:
      "data:image/jpeg;base64,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",
  },
  // 추가 캐릭터...
];

const MultiStory = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCharacters, setSelectedCharacters] = useState({});
  const [isStart, setIsStart] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isMove, setIsMove] = useState(false);
  const [info, setInfo] = useState(null);
  // const [page, setPage] = useState(1);
  const { page, setPage, scriptIndex, setScriptIndex } = multiStoryStore();
  // const [scriptIndex, setScriptIndex] = useState(0);

  const { token, profileId, nickname, accountEmail } = userStore((state) => ({
    token: state.token,
    profileId: state.profileId,
    nickname: state.nickname,
    accountEmail: state.accountEmail,
  }));
  const sessionId = useParams().sessionId;
  // before
  const { stompClient } = useSocket();

  //before
  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe("/toClient/readyGame-response", (message) => {
        console.log("구독");
        const notification = JSON.parse(message.body);
        if (notification.action === "move") {
          setIsMove(true);
          setIsStart(true);
          setPage(1);
          setScriptIndex(0);
        } else if (notification.action === "nextPage") {
          console.log("nextPage");
          setPage(page + 1);
          setScriptIndex(0);
        } else if (notification.action === "previousPage") {
          console.log("previousPage");
          setPage(page - 1);
          setScriptIndex(0);
        } else if (notification.action === "nextScript") {
          setScriptIndex(scriptIndex + 1);
        } else if (notification.action === "firstScript") {
          setScriptIndex(0);
        }

        console.log("Received: ", notification);
      });
    }
  }, [stompClient, page, scriptIndex, setPage, setScriptIndex]);

  const sendStartRequest = () => {
    const readyRequestPayload = {
      roomSession: {
        sessionId: sessionId,
      },
      isStart: true,
    };
    stompClient.send(
      "/toServer/readyGame",
      {},
      JSON.stringify(readyRequestPayload)
    );
    // setIsStart(true);
    // 여기서 딱히 set함수들 해줄 필요 없을 듯??
    console.log(readyRequestPayload);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsData = await getFriends(profileId, token);
      setFriends(friendsData.filter((friend, idx) => idx % 2 === 0));
      // console.log(friends); // 위에 주속 오류 수정하기
    };

    fetchFriends();
  }, []);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const toggleCharacterSelection = (id) => {
    setSelectedCharacters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sendInviteRequest = async (
    sessionId,
    toProfileId,
    fromProfileId,
    token
  ) => {
    console.log(
      sessionId + " " + toProfileId + " " + fromProfileId + " " + token
    );
    try {
      // getFriendEmail 함수를 호출하여 이메일 주소를 직접 받아옴
      const toAccountEmail = await getFriendEmail(toProfileId, token);
      console.log("이거는 받았을 때: " + toAccountEmail); // 이메일 주소 로그 출력
      if (stompClient) {
        console.log("있음");
      } else {
        console.log("없음");
      }
      if (stompClient && toProfileId && sessionId && toAccountEmail) {
        const requestPayload = {
          toAccountEmail: toAccountEmail,
          fromProfileId: fromProfileId,
          toProfileId: toProfileId,
          action: "sendInvite",
          roomSession: {
            sessionId: sessionId,
          },
        };
        console.log("Sending invite request with payload:", requestPayload);
        stompClient.send(
          "/toServer/game-invite",
          {},
          JSON.stringify(requestPayload)
        );
        console.log("Invite request sent:", requestPayload);
        // alert("Invite request sent:", requestPayload);
      } else {
        console.log("Missing required information for sending invite");
      }
    } catch (error) {
      console.error("Error sending invite request:", error);
    }
  };

  const sendChangePageRequest = (action) => {
    const requestPayload = {
      roomSession: {
        sessionId: sessionId,
      },
      action: action,
    };
    stompClient.send("/toServer/readyGame", {}, JSON.stringify(requestPayload));
    console.log("send:", requestPayload);
  };

  return (
    <div className="MultiStory-container">
      {/* ready 상태 */}
      <Box
        sx={{
          p: 2,
          backgroundImage: `URL(${Img})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <IconButton
          sx={{ position: "fixed", top: 16, right: 16, zIndex: 1 }}
          onClick={handlePopoverOpen}
        >
          <Avatar>
            <PeopleAlt />
          </Avatar>
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List>
            {friends.map((friend, index) => (
              <ListItem key={friend.profileId}>
                <ListItemText primary={friend.nickname} />
                <Button
                  onClick={() =>
                    sendInviteRequest(
                      sessionId,
                      friend.profileId,
                      profileId,
                      token
                    )
                  }
                >
                  <ForwardToInboxIcon />
                </Button>
              </ListItem>
            ))}
            {/* 여기에 친구 초대 목록을 렌더링합니다. */}
          </List>
        </Popover>
        {!isStart && (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ overflowX: "auto", mt: 3 }}
          >
            {characters.map((character) => (
              <Grid item key={character.id} xs={6} sm={4} md={3} lg={2} xl={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleCharacterSelection(character.id)}
                >
                  <Avatar
                    src={character.image}
                    alt={character.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mb: 1,
                      border: selectedCharacters[character.id]
                        ? "3px solid #4CAF50"
                        : "none",
                    }}
                  />
                  <Typography>{character.name}</Typography>
                  <IconButton
                    onClick={() => toggleCharacterSelection(character.id)}
                  >
                    {selectedCharacters[character.id] ? (
                      <CheckCircleOutline />
                    ) : (
                      <AddCircleOutline />
                    )}
                  </IconButton>
                  {/* 선택된 유저의 닉네임 렌더링 */}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        <MultiStoryProvider sendChangePageRequest={sendChangePageRequest}>
          <StoryRoom
            // state={stateParam}
            isStart={isStart}
            mySessionId={sessionId}
            profileId={profileId}
            toggleState={setIsStart}
            isMove={isMove}
            sendStartRequest={sendStartRequest}
            sendChangePageRequest={sendChangePageRequest}
          />
        </MultiStoryProvider>
      </Box>
    </div>
  );
};

export default MultiStory;
