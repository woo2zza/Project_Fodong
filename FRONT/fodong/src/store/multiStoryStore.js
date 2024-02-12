import { create } from "zustand";

const multiStoryStore = create((set) => ({
  sessionId: null, // sessionId 초기화
  stompClient: undefined,
  // isStompClient: false,
  // sessionId 상태 설정
  setSessionId: (id) => set({ sessionId: id }),
  //sessionId 상태 초기화
  resetSessionId: () => set({ sessionId: null }),
  setStompClient: (newStompClient) => set({ StompClient: newStompClient }),
  resetStompClient: () => set({ StompClient: undefined }),
}));

export { multiStoryStore };
