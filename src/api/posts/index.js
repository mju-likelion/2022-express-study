import { Router } from "express";
import checkLoggedIn from "../../middlewares/checkLoggedIn";
import Post from "../../models/Post";

const router = Router();

router.get("/", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (!post) {
    return res.status(404).json({
      error: "Post not exist",
    });
  }

  res.json({
    data: post,
  });
});

router.post("/", checkLoggedIn, async (req, res) => {
  console.log(req.header("x-user-id"));
  const post = await Post.create({ content: req.body.content, writer: req.header("x-user-id") });
  res.json({
    data: {
      post: {
        id: post.id,
      },
    },
  });
});

router.put("/:id", checkLoggedIn, async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (post.writer !== req.header("x-user-id")) {
    return res.json({
      error: {
        message: "Cannot modify post",
      },
    });
  }

  await post.update({ content: req.body.content });
  await post.save();

  res.json({
    data: {
      id: req.params.id,
    },
  });
});

router.delete("/:id", checkLoggedIn, async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (post.writer !== req.header("x-user-id")) {
    return res.json({
      error: {
        message: "Cannot delete post",
      },
    });
  }

  await post.destroy();
  res.json({
    data: {
      message: "Successfully deleted",
    },
  });
});

export default router;
