import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

import UserVideoComponent from "./UserVideoComponent";
//일단 video 없이

const APPLICATION_SERVER_URL = process.env.REACT_APP_API_URL;

// const APPLICATION_SERVER_URL = "http://192.168.100.91:8080/api/v1/";

// const APPLICATION_SERVER_URL = "http://localhost:8080/api/v1/";

// console.log(APPLICATION_SERVER_URL);
const StoryDetail = () => {
  // session ID 어케할 지 수정
  // 안겹쳐야 되고, 해당 방에 들어갈 때
  // 비번 있으면 비번 쳐야 들어갈 수 있게 해야함
  const [sessionId, setSessionId] = useState(
    `Story${Math.floor(Math.random() * 100)}`
  );
  const [myUserName, setmyUserName] = useState(
    `Participant${Math.floor(Math.random() * 100)}`
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const OV = useRef(new OpenVidu());
  console.log(OV);
  const handleChangeSessionId = useCallback((e) => {
    setSessionId(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e) => {
    setmyUserName(e.target.value);
  }, []);

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  // JOIN 세션
  const joinSession = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
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

          setMainStreamManager(publisher);
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
    }
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setSessionId("SessionA");
    setmyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    return createSession(sessionId).then((sessionId) => createToken(sessionId));
  }, [sessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
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

  return (
    <div>
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog">
            <h1>동화 만들기~</h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label htmlFor="userName">Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label htmlFor="sessionId">Session: </label>
                <input
                  type="text"
                  id="sessionId"
                  value={sessionId}
                  onChange={handleChangeSessionId}
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{sessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StoryDetail;
