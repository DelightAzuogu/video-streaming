const { Follow } = require("../models/follow");

class FollowRepository {
  AddFollow = async (userId, followingId) =>
    await Follow.create({ userId, followingId });

  RemovingFollow = async (userId, followingId) =>
    await Follow.deleteOne({ userId, followingId });

  IsUserFollowing = async (userId, followingId) =>
    (await Follow.findOne({ userId, followingId })) ? true : false;

  UserFollowings = async (userId) =>
    await Follow.find({ userId }).populate("followingId");
}

exports.FollowRepository = FollowRepository;
