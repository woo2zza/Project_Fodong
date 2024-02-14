import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      token: null,
      profileId: null,
      nickname: null,
      accountEmail: null,
      accountId: null,
      setToken: (token) => set(() => ({ token })),
      setProfileId: (profileId) => set({ profileId }),
      setNickname: (nickname) => set({ nickname }),
      setAccountEmail: (accountEmail) => set({ accountEmail }),
      setAccountId: (accountId) => set({ accountId }),
      clearProfileId: () => set({ profileId: null }),
      //getToken 메서드는 필요 없음; 상태를 직접 선택하여 사용 가능
    }),
    {
      // name 뭐 나중에 정해지면 변경
      name: "user-store", // 로컬 스토리지에 저장될 대 사용할 키  + 필요에따라 이름 변경가능
      getStorage: () => localStorage, // 사용할 스토리지 지정
    }
  )
);

export { userStore };
