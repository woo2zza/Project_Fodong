import React, { useState } from "react";
import axios from "axios";
import useStore from "./useStore";
function Signup() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const setToken = useStore((state) => state.setToken);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://", {
        email: Email,
        password: Password,
      });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email"> Id </label>
      <input
        className="IdInput"
        id="email"
        type="email"
        value={Email}
        onChange={(event) => {
          setEmail(event.target.value);
          console.log(event.target.value);
        }}
      />
      <br />
      <label htmlFor="password"> Password </label>
      <input
        className="PasswordInput"
        id="password"
        type="password"
        value={Password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br />
      <button type="submit">화원가입</button>
    </form>
  );
}

export default Signup;
