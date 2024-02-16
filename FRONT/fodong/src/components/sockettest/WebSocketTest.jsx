import React, { useEffect } from 'react';
import { useSocket } from '../../contexts/SocketContext';

const Main = () => {
    const stompClient = useSocket();

    useEffect(() => {
        // 서버로 메시지 보내는 함수
        const sendMessage = () => {
            if (stompClient) {
                const message = { name: "User", content: "Hello World!" };
                stompClient.send("/toServer/someEndpoint", {}, JSON.stringify(message));
                console.log("Message sent");
            }
        };

        // 예시로 컴포넌트 마운트 시 메시지 보내기
        sendMessage();

        // stompClient가 변경될 때마다 useEffect가 재실행되지 않도록 의존성 배열에 추가
    }, [stompClient]);

    return (
        <div>
            {/* Main 페이지 컨텐츠 */}
            <h1>Main Page</h1>
            {/* 필요한 경우 버튼 클릭 등을 통해 sendMessage 함수 호출 */}
        </div>
    );
};

export default Main;