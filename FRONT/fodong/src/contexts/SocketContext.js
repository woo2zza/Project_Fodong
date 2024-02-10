import React, { createContext, useContext, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);

    // 웹소켓 연결을 초기화하는 함수
    const connect = useCallback(() => {
        // 이미 연결된 상태면 더 이상 진행하지 않음
        if (stompClient) {
            console.log('Already connected.');
            return;
        }

        const socket = new SockJS(process.env.REACT_APP_BACK_SOCKET_ENDPOINT);
        const newStompClient = Stomp.over(socket);
        newStompClient.connect({}, frame => {
            console.log('Connected: ' + frame);
            setStompClient(newStompClient);
        });
    }, [stompClient]); // stompClient를 종속성 배열에 포함하여, stompClient 상태가 변경될 때만 함수가 업데이트되도록 함

    // 웹소켓 연결을 해제하는 함수
    const disconnect = useCallback(() => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log("Disconnected");
                setStompClient(null);
            });
        }
    }, [stompClient]); // stompClient가 변경될 때만 새로 생성됩니다.

    const value = { stompClient, connect, disconnect };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};