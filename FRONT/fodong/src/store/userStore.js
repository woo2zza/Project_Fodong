import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set(() => ({ token })),
      //getToken 메서드는 필요 없음; 상태를 직접 선택하여 사용 가능
    }),
    {
      // name 뭐 나중에 정해지면 변경
      name: "access-token", // 로컬 스토리지에 저장될 대 사용할 키
      getStorage: () => localStorage, // 사용할 스토리지 지정
    }
  )
);

const testTest = 1;

export { userStore, testTest };
