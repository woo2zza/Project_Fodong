import React, { useState } from "react";
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

  const onClick = async (e) => {
    e.preventDefault();
    const result = await login(id, pwd);
    console.log(result);
  };
  return (
    <div className="container">
      <div className="login-container">
        <Wrapper>
          <Title>로그인하기</Title>
          <Form onSubmit={onClick}>
            <Inputs>
              <Input
                className="input-group-text"
                placeholder="email"
                type="email"
                value={id}
                onChange={onChangeId}
              />
              <Input
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
        </Wrapper>
      </div>
    </div>
  );
};

export default Home;
