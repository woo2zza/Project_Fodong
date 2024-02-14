import { create } from "zustand";

const multiStoryStore = create((set) => ({
  sessionId: null, // sessionId 초기화
  stompClient: undefined,
  page: 1,
  scriptIndex: 0,
  setPage: (page) => set(() => ({ page })),
  // nextPage: () => set((state) => ({ page: state.page + 1 })),
  // prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
  setScriptIndex: (scriptIndex) => set(() => ({ scriptIndex })),
  // nextScriptIndex: () =>
  //   set((state) => ({ scriptIndex: state.scriptIndex + 1 })),
  // isStompClient: false,
  // sessionId 상태 설정
  setSessionId: (id) => set({ sessionId: id }),
  //sessionId 상태 초기화
  resetSessionId: () => set({ sessionId: null }),
  setStompClient: (newStompClient) => set({ StompClient: newStompClient }),
  resetStompClient: () => set({ StompClient: undefined }),
}));

export { multiStoryStore };
