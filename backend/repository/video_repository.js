const { Video } = require("../models/video");

class VideoRepository {
  GetVideoByIdIfExists = async (videoId) =>
    await Video.findOne({ _id: videoId });

  GetUserVideos = async (userId) =>
    await Video.find({ user: userId }).populate("user");

  IncreaseLikeCount = async (videoId) =>
    await Video.updateOne({ _id: videoId }, { $inc: { likeCount: 1 } });

  IncreaseDislikeCount = async (videoId) =>
    await Video.updateOne({ _id: videoId }, { $inc: { dislikeCount: 1 } });

  DecreaseLikeCount = async (videoId) =>
    await Video.updateOne({ _id: videoId }, { $inc: { likeCount: -1 } });

  DecreaseDislikeCount = async (videoId) =>
    await Video.updateOne({ _id: videoId }, { $inc: { dislikeCount: -1 } });

  IncreaseCommentCount = async (videoId) =>
    await Video.updateOne({ _id: videoId }, { $inc: { commentsCount: 1 } });

  DecreaseCommentCount = async (videoId) =>
    await Video.updateOne({ _id: videoId }, { $inc: { commentsCount: -1 } });

  IncreaseViewCount = async (videoId) =>
    await Video.updateOne({ _id: videoId }, { $inc: { viewCount: 1 } });

  GetDistinctUsersWithVideo = async () =>
    await Video.distinct("user").populate("user");

  DeleteVideo = async (videoId) => await Video.deleteOne({ _id: videoId });

  SearchVideos = async (searchQuery) => {
    const regex = new RegExp(searchQuery, "i");
    const videos = await Video.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    });
    return videos;
  };

  SearchVideosByCategory = async (category) => {
    const regex = new RegExp(category, "i");
    const videos = await Video.find({ category: { $regex: regex } });
    return videos;
  };
}

exports.VideoRepository = VideoRepository;
