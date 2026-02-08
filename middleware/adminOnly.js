export default function adminOnly(req, res, next) {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Admin access only" });
    }
  } catch (err) {
    res.status(500).json({ message: "Authorization error" });
  }
}
