import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Buttons = () => {
  const imagePaths = ["chick.png", "rabbit.png", "penguin.png"];
  const linkPaths = ["/login", "/bookList", "/bookshelf"];
  const alts = ["chick", "rabbit", "penguin"];

  return (
    <Container>
      {imagePaths.map((image, index) => (
        <StyledLink to={linkPaths[index]} key={index}>
          <ImageButton src={require(`./image/${image}`)} alt={alts[index]} />
        </StyledLink>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 50px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ImageButton = styled.img`
  width: 150px;
  height: 150px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default Buttons;
