import React from "react";
import { Wrapper, Title, Input, Inputs, Button } from "../components/Common";
import { useForm } from "../hooks/useForm";
import { signup } from "../api/signup";
// import { userStore } from "../store/userStore";

const Signup = () => {
  const [pwd, onChangePwd] = useForm();
  const [email, onChangeEmail] = useForm();
  // const setToken = userStore((state) => state.setToken);

  const onClick = async () => {
    try {
      console.log("hello");
      const response = await signup(email, pwd);
      // if (response && response.token) {
      //   setToken(response.token);
      // }
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
            <Input
              className="input-group-text"
              placeholder="email"
              type="email"
              value={email}
              onChange={onChangeEmail}
            />
            <Input
              className="input-group-text"
              placeholder="password"
              type="password"
              value={pwd}
              onChange={onChangePwd}
            />
          </Inputs>
          <Button color="green" a="1" b="2" onClick={onClick}>
            회원가입
          </Button>
        </Wrapper>
      </div>
    </div>
  );
};

export default Signup;
