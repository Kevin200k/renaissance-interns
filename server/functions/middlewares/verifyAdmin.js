exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Admin access only.");
  }
  next();
};
