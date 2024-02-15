import React, { useState, useEffect, useCallback, useRef } from "react";
import { userStore } from "../../store/userStore.js";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";

import "./multi.css";

import { Grid, Button, Paper, Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Story from "./Story.jsx";
import Script from "./Script.jsx";
import "./multi.css";
import Webcam from "react-webcam";
const APPLICATION_SERVER_URL = process.env.REACT_APP_API_URL;
// openVidu
const StoryRoom = ({
  isStart,
  mySessionId,
  profileId,
  toggleState,
  isMove,
  sendStartRequest,
  sendChangePageRequest,
}) => {
  const [playState, setPlayState] = useState(false);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [nickname, setNickName] = useState(null);

  const [myUserName, setMyUserName] = useState(
    userStore((state) => state.nickaname)
  );

  const OV = useRef(new OpenVidu()); // useRef 개념..

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  const joinSession = useEffect(() => {
    if (isMove && isStart) {
      const mySession = OV.current.initSession();

      mySession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((subscribers) => [...subscribers, subscriber]);
      });

      mySession.on("streamDestroyed", (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      setSession(mySession);
      setPlayState((prev) => true);
      // toggleState((state) => true);
    }
  }, [isMove, isStart, deleteSubscriber]);

  useEffect(() => {
    setPlayState(isStart);
  }, [isStart]);

  const getToken = useCallback(async () => {
    const sessionId = await createSession(mySessionId);
    console.log("Session ID:", sessionId);
    const token = await createToken(sessionId);
    console.log("Token:", token);
    return token;
  }, [mySessionId]);

  useEffect(() => {
    if (session) {
      // setMyUserName(userStore((state)=>state.nickname))
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        // console.log(myUserName);
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
      // setPage(1);
    }
  }, [session, getToken, myUserName]);

  useEffect(() => {
    console.log("섭스브: ");
    console.log(subscribers);
  }, [subscribers, setSubscribers]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);

    toggleState((state) => false);
  }, [session, toggleState]);

  // const switchCamera = useCallback(async () => {
  //   try {
  //     const devices = await OV.current.getDevices();
  //     const videoDevices = devices.filter(
  //       (device) => device.kind === "videoinput"
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       const newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         const newPublisher = OV.current.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });

  //         if (session) {
  //           await session.unpublish(mainStreamManager);
  //           await session.publish(newPublisher);
  //           setCurrentVideoDevice(newVideoDevice[0]);
  //           setMainStreamManager(newPublisher);
  //           setPublisher(newPublisher);
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [currentVideoDevice, session, mainStreamManager]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const handleSendStartRequest = (event) => {
    event.preventDefault();
    sendStartRequest();
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("세션 : ", response.data);
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  // UI 관련
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(subscribers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSubscribers(items);
  };
  return (
    <div className="Room-container">
      {!playState ? (
        <div id="join" className="storyRoomWrapper">
          <div id="join-dialog">
            <Webcam className="web-container" />
            <h1>동화 만들기~</h1>

            <form
              className="form-group storyRoomForm"
              onSubmit={handleSendStartRequest}
            >
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="시작하기"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}
      {playState ? (
        <Box id="session" className="storyRoomSession">
          <Box
            id="session-header"
            sx={{ mb: 2 }}
            className="storyRoomSessionHeader"
          ></Box>

          {/* <Story sendChangePageRequest={sendChangePageRequest} />
          <Script sendChangePageRequest={sendChangePageRequest} /> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {publisher && (
                <Box
                  sx={{
                    flexGrow: 0,
                    margin: "0.5rem",
                    border: "4px solid #FFC0CB", // Pink solid border
                    borderRadius: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
                    overflow: "hidden", // Ensures the video corners are also rounded
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Slightly larger shadow on hover for interactive effect
                    },
                  }}
                >
                  <UserVideoComponent
                    streamManager={publisher}
                    className="storyRoomPublisherVideo"
                  />
                </Box>
              )}
              <Droppable droppableId="subscribers" direction="horizontal">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    {subscribers.map((sub, i) => (
                      // <Box
                      //   key={sub.id}
                      //   sx={{
                      //     flexGrow: 0,
                      //     margin: "0.5rem",
                      //     border: "2px solid #87CEEB", // Pink solid border
                      //     borderRadius: "20px",
                      //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
                      //     overflow: "hidden",
                      //   }}
                      // >
                      <Draggable key={sub.id} draggableId={sub.id} index={i}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              margin: "0.5rem",
                              border: "2px solid #87CEEB",
                              borderRadius: "20px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                              overflow: "hidden",
                            }}
                          >
                            <UserVideoComponent
                              streamManager={sub}
                              className="storyRoomUserVideo"
                            />
                            <span>{sub.id}</span>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          </DragDropContext>
        </Box>
      ) : null}
    </div>
  );
};

export default StoryRoom;

{
  /* <Grid container xs={12} sm={6} spacing={2}>
  {publisher && (
    <Box item>
      <UserVideoComponent streamManager={publisher} />
    </Box>
  )}
  {subscribers.map((sub, i) => (
    <Grid
      key={sub.id}
      item
      // onClick={() => handleMainVideoStream(sub)}
    >
      <Box key={sub.id} className="storyRoomSubscriberBox">
        <UserVideoComponent
          streamManager={sub}
          className="storyRoomUserVideo"
        />
      </Box>
      <span>{sub.id}</span>
    </Grid>
  ))}
</Grid>; */
}
