import axios from "axios";

const API_BASE_URL = "http://192.168.100.91:8080/profile/make";

// export const fetchProfiles = () => {
//   return axios.get(`${API_BASE_URL}/`);
// };

function fetchProfiles() {
  return axios.get(`${API_BASE_URL}/`);
}

export default fetchProfiles;
