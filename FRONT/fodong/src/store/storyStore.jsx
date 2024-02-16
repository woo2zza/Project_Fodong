// store.js
import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}/books/1/init`;

const storyStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true });
    const token = localStorage.getItem('Token'); // 토큰 가져오기
    // console.log(token);
    const config = {
      headers: {
        Authorization: token ? `${token}` : "", // Bearer 스키마 사용
      },
    };

    try {
      const accountId = localStorage.getItem('accountId');
      if (!accountId) {
        console.log("No accountId available");
        set({ loading: false });
        return;
      }

      const response = await axios.get(`${API_BASE_URL}`, config);
      set({ data: response.data, loading: false });
      console.log(response.data);
    } catch (error) {
      console.error("Fetching data failed", error);
      set({ loading: false, error });
    }
  },
}));

export default storyStore;