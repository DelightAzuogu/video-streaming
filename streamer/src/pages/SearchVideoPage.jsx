import { CircularProgress, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import GridVideoCard from "../components/gridVideoCard";
import { SendGetRequest } from "../services/api";
import { baseUrl } from "../services/api/constants/endpointsConstants";

function SearchVideos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchSearchResults() {
    if (searchQuery === "") return;
    setIsLoading(true);
    const url = `${baseUrl}/video/search?searchQuery=${encodeURIComponent(
      searchQuery
    )}`;

    try {
      const { responseData } = await SendGetRequest(url);
      setVideos(responseData.videos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <SearchBar>
        <StyledTextField
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          placeholder="Search Videos"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchSearchResults}
        >
          Search
        </Button>
      </SearchBar>
      {isLoading && <CircularProgress />}
      <VideoGrid>
        {videos.length === 0 && !isLoading && (
          <CenteredTypography>No Videos Matching Search</CenteredTypography>
        )}
        {videos.map((v, i) => (
          <VideoCardWrapper key={i}>
            <GridVideoCard video={v} />
          </VideoCardWrapper>
        ))}
      </VideoGrid>
    </Container>
  );
}

// STYLES FOR COMPONENTS
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white; /* Set text color to white */
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  & input {
    color: white; /* Set input text color to white */
  }
  & .MuiOutlinedInput-root {
    background-color: rgba(255, 255, 255, 0.1); /* Set input background color */
    border-color: white; /* Set input border color */
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const VideoCardWrapper = styled.div`
  width: 100%;
`;

const CenteredTypography = styled(Typography)`
  text-align: center;
`;

export default SearchVideos;
