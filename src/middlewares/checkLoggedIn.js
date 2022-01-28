const checkLoggedIn = (req, res, next) => {
  if (!req.headers["x-user-id"]) {
    return res.status(401).json({
      error: "Please log in first",
    });
  }

  next();
};

export default checkLoggedIn;
