import React, { useState, useRef, useEffect, useCallback } from "react";

import axios from "axios";

import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";
// import OpenViduSession from "openvidu-react";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

const Vidu = () => {
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  const OV = useRef(new OpenVidu()).current;

  // url들을 다시 설정해야 할 수도 백엔드 코드에 따라
  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  };

  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  };

  // called when joining a session
  const joinSession = useCallback(async () => {
    const newSession = OV.initSession();
    setSession(newSession);

    newSession.on("streamCreated", (event) => {
      var subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prevsubscribers) => [...prevsubscribers, subscriber]);
    });

    newSession.on("streamDestroyed", (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((sub) => sub !== event.stream.streamManager)
      );
    });

    newSession.on("exception", (exception) => {
      console.warn(exception);
    });

    const token = await getToken();
    newSession
      .connect(token, { clientData: myUserName })
      .then(async () => {
        let newPublisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        newSession.publish(newPublisher);

        var devices = await OV.getDevices();
        var videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        var currentVideoDeviceId = newPublisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId;
        var newCurrentVideoDevice = videoDevices.find(
          (device) => device.deviceId === currentVideoDeviceId
        );

        setCurrentVideoDevice(newCurrentVideoDevice);
        setMainStreamManager(newPublisher);
        setPublisher(newPublisher);
      })
      .catch((error) => {
        console.log(
          "There was an error connection to the session:",
          error.code,
          error.message
        );
      });
  }, [mySessionId, myUserName, OV]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          var newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await session.unpublish(mainStreamManager);
          await session.publish(newPublisher);

          setCurrentVideoDevice(newVideoDevice[0]);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, mainStreamManager, OV, session]);

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img src="" alt="바꾸자1" />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label>Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
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
            <h1 id="session-title">{mySessionId}</h1>
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
              onClick={switchCamera}
              value="Swtich Camera"
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

export default Vidu;
