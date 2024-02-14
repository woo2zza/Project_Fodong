import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { userStore } from "../store/userStore";
import { multiStoryStore } from "../store/multiStoryStore";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  // const Navi = useNavigate();

  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  // const [profileId, setProfileId] = useState(
  // userStore((state) => state.profileId)
  // );
  // const token = userStore((state) => state.token);
  const { accountEmail, token, profileId } = userStore((state) => ({
    token: state.token,
    accountEmail: state.accountEmail,
    profileId: state.profileId,
  }));
  const [sessionId, setSessionId] = useState(null);
  const [isGameAccepted, setIsGameAccepted] = useState(false);

  // 모달 관련 상태
  const [openModal, setOpenModal] = useState(false);
  const [inviteRequest, setInviteRequest] = useState(null); // 친구 요청 데이터 저장을 위한 상태

  // 모달 열기 함수
  const handleOpenModal = (request) => {
    setInviteRequest(request);
    setOpenModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setOpenModal(false);
    setInviteRequest(null); // 모달 닫을 때 친구 요청 데이터 초기화
  };

  const handleAccept = () => {
    const invitationPayload = {
      fromProfileId: profileId,
      toProfileId: inviteRequest.fromProfileId,
      roomSession: { ...inviteRequest.roomSession },
      // roomSessionId: inviteRequest.roomSessionId,
      action: "accepted",
    };
    // WebSocket을 통해 서버로 전송
    stompClient.send(
      "/toServer/game-invite",
      {},
      JSON.stringify(invitationPayload)
    );
    setSessionId(invitationPayload.roomSession.sessionId);
    console.log(invitationPayload.roomSession.sessionId);
    setIsGameAccepted(true);
    handleCloseModal();
  };

  const handleReject = () => {
    const invitationPayload = {
      fromProfileId: profileId,
      toProfileId: inviteRequest.fromProfileId,
      // roomSession : inviteRequest.roomSession,
      // roomSessionId: inviteRequest.roomSessionId,
      action: "reject",
    };

    // WebSocket을 통해 서버로 전송
    stompClient.send(
      "/toServer/game-invite",
      {},
      JSON.stringify(invitationPayload)
    );
    setIsGameAccepted(false);
    handleCloseModal();
  };

  // 웹소켓 연결을 초기화하는 함수
  // 의존성을
  const connect = useCallback(() => {
    if (stompClient) {
      console.log("Already connected.");
      return;
    }

    const socket = new SockJS(process.env.REACT_APP_BACK_SOCKET_ENDPOINT);
    const newStompClient = Stomp.over(socket);

    newStompClient.connect(
      {
        Authorization: `${token}`,
        profileId: profileId,
        accountEmail: accountEmail,
      },
      (frame) => {
        console.log("Connected: " + frame);
        // console.log(token);
        // console.log(profileId);
        // console.log(accountEmail);
        // console.log("여까지 테스트");
        setStompClient(newStompClient);
        setIsConnected(true); // 연결 성공 시 isConnected를 true로 설정

        // 게임 초대 요청 구독 설정
        // 여기 세부 로직 바꿔야 한다!!!
        // "/user/queue/toClient/game-invite-response"
        newStompClient.subscribe(
          "/toClient/game-invite-response",
          (message) => {
            // const notification = JSON.parse(message.body);
            const notification = JSON.parse(message.body);
            // "==="를 사용하기 때문에 type도 백과 프론트가 맞추는 것이 매우 중요하다!!
            if (
              notification.action === "sendInvite" &&
              notification.toProfileId === profileId
            ) {
              const inviteInfo = {
                fromProfileId: notification.fromProfileId,
                toProfileId: notification.toProfileId,
                roomSession: notification.roomSession,
                action: notification.action,
                newTopic: notification.newTopic,
                fromNickname: notification.fromNickname,
                toNickname: notification.toNickname,
              };
              handleOpenModal(inviteInfo);
              console.log("Received message:", notification);
              // console.log(openModal);
              // console.log(inviteRequest);
            } else {
              console.log("SomeOne invited friends to play: ", notification);
            }
          }
        );
      }
    );
  }, [stompClient, profileId]);

  // 웹소켓 연결을 해제하는 함수
  const disconnect = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected");
        setStompClient(null);
        setIsConnected(false);
      });
    }
  }, [stompClient, profileId]);

  // isGameAccepted
  const value = {
    stompClient,
    connect,
    disconnect,
    isConnected,
    sessionId,
    isGameAccepted,
  };

  return (
    <>
      <SocketContext.Provider value={value}>
        {children}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>친구 요청</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {inviteRequest
                ? `${inviteRequest.fromNickname}님으로부터 동화 만들기 초대 요청이 왔습니다.`
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
      </SocketContext.Provider>
    </>
  );
};
