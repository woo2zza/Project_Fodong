import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { userStore } from "../store/userStore";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
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
        newStompClient.subscribe(
          "/user/queue/toClient/game-invite-response",
          (message) => {
            // const notification = JSON.parse(message.body);
            const response = JSON.parse(message.body);
            console.log("Received message:", response);
            // 여기에서 메시지에 따른 처리를 할 수 있습니다.
          }
        );
      }
    );
  }, [stompClient, profileId, accountEmail, token]);

  // 웹소켓 연결을 해제하는 함수
  const disconnect = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected");
        setStompClient(null);
        setIsConnected(false);
      });
    }
  }, [stompClient]);

  const value = { stompClient, connect, disconnect, isConnected };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
