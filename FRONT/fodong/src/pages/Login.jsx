import React, { useState } from "react";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Title,
  StyledInput,
  Inputs,
  Form,
  Button,
} from "../components/Common";

const Home = () => {
  const navigate = useNavigate();

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

  const onClick = async (e) => {
    e.preventDefault();
    const result = await login(id, pwd);
    console.log(result);
    navigate("/profile");
  };

  const goToLogin = () => {
    navigate("/signup");
  };
  return (
    <div className="container">
      <div className="login-container">
        <Wrapper>
          <Title>로그인하기</Title>
          <Form onSubmit={onClick}>
            <Inputs>
              <StyledInput
                className="input-group-text"
                placeholder="email"
                type="email"
                value={id}
                onChange={onChangeId}
              />
              <StyledInput
                className="input-group-text"
                placeholder="Password"
                type="password"
                value={pwd}
                onChange={onChangePassword}
              />
            </Inputs>
            <Button color="green" type="submit">
              Login
            </Button>
          </Form>
          <Button color="rgb(0, 100, 100)" onClick={goToLogin}>
            회원가입
          </Button>
        </Wrapper>
      </div>
    </div>
  );
};

export default Home;
