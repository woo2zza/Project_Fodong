import axios from "axios";
export const login = async (id, pwd) => {
  const result = await axios.post("", {
    id,
    pwd,
  });
  return result.data.data;
};
