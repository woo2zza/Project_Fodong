import { styled } from "styled-components";
export const Title = styled.div`
  font-size: 50px;
  font-weight: 400;
  margin-bottom: 30px;
  color: white;
`;
export const StyledInput = styled.input`
  font-size: 25px;
  height: 30px;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: ${(props) => props.color || "white"};
  margin-top: 8px; // 간격 추가
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Inputs = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  height: 100%;
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.color || "blue"};
  color: white;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  margin: 10px;

  &:hover {
    background-color: Yellow;
    color: black;
  }
`;
