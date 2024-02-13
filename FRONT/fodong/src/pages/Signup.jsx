import React from "react";
import {
  Wrapper,
  Title,
  StyledInput,
  Inputs,
  Button,
} from "../components/Common";
import { useForm } from "../hooks/useForm";
import { signup } from "../api/signup";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore";
import { useEffect } from "react";
// import { userStore } from "../store/userStore";
const Signup = () => {
  const navigate = useNavigate();
  const [pwd, onChangePwd] = useForm();
  const [email, onChangeEmail] = useForm();
  // const setToken = userStore((state) => state.setToken);

  useEffect(() => {
    userStore.getState().clearProfileId();
    console.log(userStore.getState().profileId);
  }, []);

  const onClick = async () => {
    try {
      console.log("hello");
      const response = await signup(email, pwd);
      // if (response && response.token) {
      //   setToken(response.token);
      // }
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <Wrapper>
          <Title>회원가입</Title>
          <Inputs>
            <StyledInput
              className="input-group-text"
              placeholder="email"
              type="email"
              value={email}
              onChange={onChangeEmail}
            />
            <StyledInput
              className="input-group-text"
              placeholder="password"
              type="password"
              value={pwd}
              onChange={onChangePwd}
            />
          </Inputs>
          <div>
            <div className="glowButtonWrapper">
              <button
                color="green"
                type="submit"
                onClick={onClick}
                className="glowButton"
              >
                <span className="buttonText">회원가입</span>
              </button>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Signup;
