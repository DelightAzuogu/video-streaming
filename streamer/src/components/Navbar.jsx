import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input type="text" placeholder="Search" />
        </Search>
      </Wrapper>
    </Container>
  );
}

// STYLES FOR COMPONENTS
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: #0f0f0f;
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #1c1c1c;
  border-radius: 30px;
`;
const Input = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  color: #fff;
`;

export default Navbar;
