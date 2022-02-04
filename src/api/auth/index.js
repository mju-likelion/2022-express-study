import { Router } from "express";
import User from "../../models/User";

const router = Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({
      error: {
        message: "User not exist",
      },
    });
  }

  if (user.password !== req.body.password) {
    return res.status(401).json({
      error: {
        message: "Email/Password combination not match",
      },
    });
  }

  res.json({
    data: {
      user: {
        id: user.id,
      },
    },
  });
});

router.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: "Form not valid",
    });
  }

  const { email, password } = req.body;

  const exist = await User.findOne({ where: { email } });
  if (exist) {
    return res.status(409).json({
      error: "User already exist",
    });
  }

  const user = await User.create({ email, password });
  res.json({
    data: {
      user: {
        id: user.id,
      },
    },
  });
});

export default router;
