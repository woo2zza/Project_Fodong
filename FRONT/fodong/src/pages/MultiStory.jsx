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
import antCharacter from "../components/storyTelling/img/scriptant.webp";
import grasshopperCharacter from "../components/storyTelling/img/scriptgrasshopper.webp";
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
    image: antCharacter,
  },
  {
    id: 2,
    name: "베짱이",
    image: grasshopperCharacter,
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
  }, [profileId, token]);

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
          padding: "0",
        }}
      >
        {!isStart && (
          <>
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
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ overflowX: "auto", mt: 3 }}
            >
              {characters.map((character) => (
                <Grid
                  item
                  key={character.id}
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  xl={2}
                >
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
          </>
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
