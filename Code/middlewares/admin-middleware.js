const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden. Only admins are allowed." });
  }
  next();
};

module.exports = adminMiddleware;
