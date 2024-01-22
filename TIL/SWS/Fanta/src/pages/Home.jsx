import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";
import {
  Wrapper,
  Title,
  Input,
  Inputs,
  Form,
  Button,
} from "../components/Common";
const Home = () => {
  const [id, setId] = useState("");
  const onChangeId = (event) => {
    setId(event.target.value);
    console.log(event.target.value);
  };

  const [pwd, setPwd] = useState("");
  const onChangePassword = (event) => {
    setPwd(event.target.value);
    console.log(event.target.value);
  };

  const router = useNavigate();
  const onClick = async () => {
    const result = await login(id, pwd);
    console.log(result);
    const { accessToken, refreshToken } = result;
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
    router("/mypage");
  };
  return (
    <Wrapper>
      <Title>로그인하기</Title>
      <Form>
        <Inputs>
          <Input
            placeholder="Id"
            type="email"
            value={id}
            onChange={onChangeId}
          />
          <Input
            placeholder="Password"
            type="password"
            value={pwd}
            onChange={onChangePassword}
          />
        </Inputs>
        <Button onClick={onClick}>Login</Button>
      </Form>
    </Wrapper>
  );
};

export default Home;
