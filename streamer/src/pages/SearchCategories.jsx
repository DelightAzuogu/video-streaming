import React, { useState } from "react";
import {
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { categories } from "../services/constants/categories";
import { SendGetRequest, SendJsonPostRequest } from "../services/api";
import { baseUrl } from "../services/api/constants/endpointsConstants";
import GridVideoCard from "../components/gridVideoCard";
import styled from "styled-components";

const SearchCategoriesPage = () => {
  const [category, setCategory] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const fetchVideosByCategory = async (category) => {
    const url = `${baseUrl}/video/search/categories`;
    const body = { category };

    try {
      const { responseData } = await SendGetRequest(url, body);
      return responseData.videos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const videoList = await fetchVideosByCategory(category);
      setVideos(videoList);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Search Videos by Category
      </Typography>
      <SearchBar>
        <FormControl fullWidth margin="normal" sx={{ marginBottom: "20px" }}>
          <InputLabel style={{ color: "white" }}>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                color: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
            style={{ color: "white", border: "1px", borderColor: "white" }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Search"
          )}
        </Button>
      </SearchBar>
      {error && <ErrorText>{error}</ErrorText>}
      <Spacing />
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
};

// STYLES FOR COMPONENTS
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white; /* Set text color to white */
`;

const ErrorText = styled(Typography)`
  color: red;
  margin-top: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  gap: 10px;
  margin-bottom: 20px;
`;

const Spacing = styled.div`
  height: 20px;
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

export default SearchCategoriesPage;
