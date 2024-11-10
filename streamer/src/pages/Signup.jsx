import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../services/api/constants/endpointsConstants";
import { SendFormDataPostRequest } from "../services/api";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSignUp = () => {
    if (fullName === "" || email === "" || password === "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // TODO: validate email and password format

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    SendFormDataPostRequest(`${baseUrl}/auth/signup`, formData)
      .then(({ responseData }) => {
        localStorage.setItem("token", responseData.token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        setErrorMessage(error.message || "An error occurred during signup");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Welcome to Streamer</Title>
        <Input
          placeholder="Full name"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <Input placeholder="Email" value={email} onChange={handleEmailChange} />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        <div>
          {errorMessage}
          {isLoading ? "Loading..." : ""}
        </div>
        <Button disabled={isLoading} onClick={handleSignUp}>
          Sign Up
        </Button>
        <Link to="/login">
          <AccountText>Have an account? Login</AccountText>
        </Link>
      </Wrapper>
    </Container>
  );
};

// STYLES FOR COMPONENTS
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  background-color: #202020;
  border: 1px solid #373737;
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #ffffff;
`;

const AccountText = styled.p`
  font-size: 14px;
  font-weight: 300;
  text-decoration: underline;
  color: #ffffff;
`;

const Input = styled.input`
  border: 1px solid #373737;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: #ffffff;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #373737;
  color: #aaaaaa;
`;

export default Signup;
