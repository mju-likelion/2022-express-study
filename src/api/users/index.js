import { Router } from "express";
import User from "../../models/User";
import checkLoggedIn from "../../middlewares/checkLoggedIn";
import Follow from "../../models/Follow";

const router = Router();

router.post("/follow/:userId", checkLoggedIn, async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.userId } });
  if (!user) {
    return res.status(404).json({
      error: {
        message: "User not exist",
      },
    });
  }

  await Follow.create({
    followingId: req.header("x-user-id"),
    followerId: req.params.userId,
  });

  res.json({
    data: {
      message: "Successfully followed",
    },
  });
});

router.post("/unfollow/:userId", checkLoggedIn, async (req, res) => {
  const follow = await Follow.findOne({
    where: {
      followingId: req.header("x-user-id"),
      followerId: req.params.userId,
    },
  });

  if (!follow) {
    return res.json({
      error: {
        message: "You didn't follow that user",
      },
    });
  }

  await follow.destroy();
  res.json({
    data: {
      message: "Successfully unfollowed",
    },
  });
});

export default router;
