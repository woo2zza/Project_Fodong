import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function WebSocketTest() {
    const [stompClient, setStompClient] = useState(null);
    const [message, setMessage] = useState(''); // 사용자 입력 메시지를 저장할 상태
    const [receivedMessages, setReceivedMessages] = useState([]); // 서버로부터 받은 메시지들을 저장할 상태

    useEffect(() => {
        const socket = new SockJS('http://192.168.0.8:8080/test/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            setStompClient(client);

            client.subscribe('/toClient/greetings', (message) => {
                const receivedMsg = JSON.parse(message.body).content;
                setReceivedMessages(prev => [...prev, receivedMsg]);
            });
        });

        return () => {
            if(client) {
                client.disconnect();
            }
        };
    }, []);

    // 메시지 전송 함수
    const sendMessage = () => {
        if (stompClient && message.trim() !== '') {
            stompClient.send("/toServer/hello", {}, JSON.stringify({ name: message }));
            setMessage(''); // 메시지 전송 후 입력 필드 초기화
        }
    };

    return (
        <div>
            <h2>WebSocket 테스트</h2>
            {/* 메시지 입력 폼 */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지 입력"
            />
            <button onClick={sendMessage}>메시지 보내기</button>
            <div>
                <h3>수신된 메시지:</h3>
                {receivedMessages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
}

export default WebSocketTest;