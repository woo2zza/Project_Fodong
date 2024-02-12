import { create } from "zustand";

const multiStoryStore = create((set) => ({
  sessionId: null, // sessionId 초기화
  // isStompClient: false,
  // sessionId 상태 설정
  setSessionId: (id) => set({ sessionId: id }),
  //sessionId 상태 초기화
  resetSessionId: () => set({ sessionId: null }),
  // setStompClient: () => set({ isStompClient: true }),
  // resetStompClient: () => set({ isStompClient: false }),
}));

export default multiStoryStore;
