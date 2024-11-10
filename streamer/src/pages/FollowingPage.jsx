import React, { useEffect, useState } from "react";
import { baseUrl } from "../services/api/constants/endpointsConstants";
import { SendGetRequest } from "../services/api";
import { CircularProgress, Container, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FollowingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [followings, setFollowings] = useState([]);

  const navigate = useNavigate();
  async function NavigateToUser(userId) {
    navigate(`/user/${userId}`);
  }

  async function GetUserFollowingIds() {
    setIsLoading(true);
    const url = `${baseUrl}/user/following`;
    try {
      const { responseData } = await SendGetRequest(url);

      setFollowings(responseData.followings);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetUserFollowingIds();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <WrapperContainer>
          {followings.map((following) => (
            <Wrapper
              key={following.id}
              onClick={() => NavigateToUser(following.id)}
            >
              <ProfileSection>
                <Image
                  src={`${baseUrl}/image?imagePath=${following.profilePictureUrl}`}
                  alt={following.name}
                />
                <Name>{following.name}</Name>
              </ProfileSection>
              <FollowersCount>
                {following.followersCount} Followers
              </FollowersCount>
            </Wrapper>
          ))}
        </WrapperContainer>
      )}
    </Container>
  );
};

// STYLES FOR COMPONENTS
const WrapperContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const Name = styled(Typography).attrs({ variant: "h6" })`
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px; /* Adjust this value as needed */
`;

const FollowersCount = styled(Typography).attrs({ variant: "body2" })`
  color: white;
`;

const Wrapper = styled.div`
  flex-basis: calc(20% - 20px);
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    flex-basis: calc(33.33% - 20px);
  }

  @media screen and (max-width: 600px) {
    flex-basis: calc(100% - 20px);
  }
`;

export default FollowingPage;
