import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getstats = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbum, totalUsers, uniqueArtist] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbum,
      totalSongs,
      totalUsers,
      totalArtist: uniqueArtist[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
