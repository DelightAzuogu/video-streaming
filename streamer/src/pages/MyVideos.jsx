import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GridVideoCard from "../components/gridVideoCard";
import { SendGetRequest, SendJsonPostRequest } from "../services/api";
import { baseUrl } from "../services/api/constants/endpointsConstants";

function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUserVideos() {
    setIsLoading(true);

    const url = `${baseUrl}/video/my-videos`;

    try {
      const { responseData } = await SendGetRequest(url);

      if (!responseData.videos.length) {
        return;
      }

      setVideos(responseData.videos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function DeleteVideo(videoId) {
    const url = `${baseUrl}/video/delete/${videoId}`;

    try {
      await SendJsonPostRequest(url);

      fetchUserVideos();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserVideos();
  }, []);

  return (
    <Container>
      {videos.map((v, i) => {
        return (
          <VideoCardWrapper key={i}>
            <GridVideoCard video={v} deleteVideo={DeleteVideo} />
          </VideoCardWrapper>
        );
      })}

      {isLoading && <CircularProgress />}
    </Container>
  );
}

// STYLES FOR COMPONENTS
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const VideoCardWrapper = styled.div`
  width: 100%;
`;

export default MyVideos;
