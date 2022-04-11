const isAdminRole = async (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "we are trying validate role without validate token first",
    });
  }

  const { role } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({ msg: "denied access - only admin roles" });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "we are trying validate role without validate token first",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ msg: "denied access - only authorized roles" });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
