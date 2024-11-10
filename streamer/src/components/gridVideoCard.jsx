import { CalendarMonth, OndemandVideo } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Icon,
  Typography,
} from "@mui/material";
import React from "react";
import { baseUrl } from "../services/api/constants/endpointsConstants";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { NumberShorterner } from "../helpers/numberFormatter";
import { DateFormatter } from "../helpers/dateFormatter";
import { useNavigate } from "react-router-dom";
import { SendJsonPostRequest } from "../services/api";

const GridVideoCard = ({ video, deleteVideo }) => {
  const navigate = useNavigate();

  const onClickCard = async () => {
    let url;
    if (localStorage.getItem("token") !== undefined) {
      url = `${baseUrl}/video/view/${video.id}`;
    } else {
      url = `${baseUrl}/video/guest/view/${video.id}`;
    }

    try {
      await SendJsonPostRequest(url);
      navigate(`/video/${video.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteButtonClick = async (event) => {
    // Prevent propagation of the click event to the parent card
    event.stopPropagation();

    if (deleteVideo) {
      await deleteVideo(video.id);
    }
  };

  return (
    <Card
      key={video.id}
      sx={{
        bgcolor: "white",
        width: 300,
        height: "100%",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
      onClick={onClickCard}
    >
      <CardMedia
        component="img"
        alt="thumbnail"
        height="150"
        image={`${baseUrl}/image?imagePath=${video.thumbnail}`}
      />

      <CardContent sx={{ padding: "16px", position: "relative" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ marginBottom: "8px", overflow: "hidden" }}
        >
          <img
            src={`${baseUrl}/image?imagePath=${video.user.profilePicture}`}
            alt="User"
            width={20}
            height={20}
            style={{ borderRadius: "50%", marginRight: "8px" }}
          />
          <Typography
            variant="body2"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {video.title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" mr={2}>
            <Icon color="primary" sx={{ color: "black" }}>
              <ThumbUpOffAltIcon />
            </Icon>
            <Typography>{NumberShorterner(video.likeCount)}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mr={2}>
            <Icon color="primary" sx={{ color: "black" }}>
              <ThumbDownOffAltIcon />
            </Icon>
            <Typography>{NumberShorterner(video.dislikeCount)}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mr={2}>
            <Icon color="primary" sx={{ color: "black" }}>
              <OndemandVideo />
            </Icon>
            <Typography>{NumberShorterner(video.viewCount)}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Icon color="primary" sx={{ color: "black" }}>
              <CalendarMonth />
            </Icon>
            <Typography>{DateFormatter(video.date)}</Typography>
          </Box>
        </Box>
        {deleteVideo && (
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff5f5f",
                color: "white",
                "&:hover": {
                  backgroundColor: "#e03232",
                },
              }}
              onClick={onDeleteButtonClick}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default GridVideoCard;
