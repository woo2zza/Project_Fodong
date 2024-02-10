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
  const [profileId, setProfileId] = useState(
    userStore((state) => state.profileId)
  );
  // const profileId = userStore((state) => state.profileId);
  // 웹소켓 연결을 초기화하는 함수
  const connect = useCallback(() => {
    // 이미 연결된 상태면 더 이상 진행하지 않음
    if (stompClient) {
      console.log("Already connected.");
      return;
    }

    const socket = new SockJS(process.env.REACT_APP_BACK_SOCKET_ENDPOINT);
    const newStompClient = Stomp.over(socket);

    newStompClient.connect({ profileId: profileId }, (frame) => {
      console.log("Connected: " + frame);
      //   console.log("profileId: " + profileId);
      setStompClient(newStompClient);
    });
  }, [stompClient, profileId]); // stompClient를 종속성 배열에 포함하여, stompClient 상태가 변경될 때만 함수가 업데이트되도록 함

  // 웹소켓 연결을 해제하는 함수
  const disconnect = useCallback(() => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected");
        setStompClient(null);
      });
    }
  }, [stompClient]); // stompClient가 변경될 때만 새로 생성됩니다.

  // 방금 추가
  const value = { stompClient, connect, disconnect };

  //   useEffect(() => {
  //     // Ensure the stompClient is connected before subscribing
  //     if (stompClient) {
  //       const friendRequestSubscription = stompClient.subscribe(
  //         "/toClient/friend-request",
  //         (message) => {
  //           const notification = JSON.parse(message.body);
  //           console.log("Received friend request:", notification);
  //           // Update your state or show a notification

  //           alert(notification.message);
  //         }
  //       );

  //       //   Clean up subscription on component unmount
  //       return () => {
  //         friendRequestSubscription.unsubscribe();
  //       };
  //     }
  //   }, [stompClient]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
