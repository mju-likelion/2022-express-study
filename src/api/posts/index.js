import { Router } from "express";
import { chain, find, pull, remove } from "lodash";
import checkLoggedIn from "../../middlewares/checkLoggedIn";

const router = Router();

let nextId = 2;
let posts = [
  {
    id: 1,
    content: "lorem ipsum",
    writer: 1,
  },
];

// 요건 실제 DB를 연동하지 않아서 임시로 ORM처럼 함수를 만든 부분이에요
const myOrm = {
  findPosts: () => {
    return posts;
  },
  findPostById: id => {
    const find = posts.filter(post => post.id === id);
    return find.length === 0 ? null : find[0];
  },
  createPost: data => {
    const index = posts.push({
      id: nextId++,
      content: data.content,
      writer: data.writer,
    });
    return posts[index];
  },
  updatePost: data => {
    const { id, content, writer } = data;
    const result = chain(posts).find({ id: id }).merge({ id, content, writer }).value();
  },
  deletePost: id => {
    posts = remove(posts, post => post.id === id);
  },
};

const isMine = req => {
  const post = find(posts, { id: +req.params.id });
  return post.id === +req.headers["x-user-id"];
};

router.get("/", (req, res) => {
  const posts = myOrm.findPosts();
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const post = myOrm.findPostById(req.params.id);
  if (!post) {
    return res.status(404).json({
      error: "Post not exist",
    });
  }

  res.json({
    data: post,
  });
});

router.post("/", checkLoggedIn, (req, res) => {
  const post = myOrm.createPost({ content: req.body.content, writer: req.header["x-user-id"] });
  res.json({
    data: {
      post: {
        id: post.id,
      },
    },
  });
});

router.put("/:id", checkLoggedIn, (req, res) => {
  if (!isMine(req)) {
    return res.json({
      error: {
        message: "Cannot modify post",
      },
    });
  }

  myOrm.updatePost({
    id: req.params.id,
    content: req.body.content,
    writer: req.headers["x-user-id"],
  });
  res.json({
    data: {
      id: req.params.id,
    },
  });
});

router.delete("/:id", checkLoggedIn, (req, res) => {
  if (!isMine(req)) {
    return res.json({
      error: {
        message: "Cannot delete post",
      },
    });
  }

  myOrm.deletePost(req.params.id);
  res.json({
    data: {
      message: "Successfully deleted",
    },
  });
});

export default router;
