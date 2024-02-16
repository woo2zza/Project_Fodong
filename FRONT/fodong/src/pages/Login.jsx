import React, { useState, useEffect } from "react";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Title,
  StyledInput,
  Inputs,
  Form,
} from "../components/Common";
import { userStore } from "../store/userStore";

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

  useEffect(() => {
    userStore.getState().clearProfileId();
    console.log(userStore.getState().profileId);
  }, []);

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
          <Title>동화 입장하기</Title>
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
            <div className="glowButtonWrapper">
              <button color="green" type="submit" className="glowButton">
                <span className="buttonText">로그인</span>
              </button>
            </div>
          </Form>

          <div className="glowButtonWrapper">
            <button
              color="green"
              type="submit"
              onClick={goToLogin}
              className="glowButton"
            >
              <span className="buttonText">회원가입</span>
            </button>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Home;
