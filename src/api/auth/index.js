import { Router } from "express";

const router = Router();

let nextId = 2;
let users = [
  {
    id: 1,
    email: "test@email.com",
    password: "pa$$w0rd",
  },
];

// 요건 실제 DB를 연동하지 않아서 임시로 ORM처럼 함수를 만든 부분이에요
const myOrm = {
  findUserByEmail: email => {
    const find = users.filter(user => user.email === email);
    return find.length === 0 ? null : find[0];
  },
  createUser: data => {
    const index = users.push({
      id: nextId++,
      ...data,
    }) - 1;
    return users[index];
  },
};

router.post("/login", (req, res) => {
  const user = myOrm.findUserByEmail(req.body.email);
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
        message: "Email/Password combination not match"
      }
    })
  }

  res.json({
    data: {
      user: {
        id: user.id,
      },
    },
  });
});

router.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: "Form not valid"
    })
  }

  const exist = myOrm.findUserByEmail(req.body.email);
  if (exist) {
    return res.status(409).json({
      error: "User already exist",
    });
  }
  const user = myOrm.createUser(req.body);
  res.json({
    data: {
      user: {
        id: user.id,
      }
    }
  })
});

export default router;
