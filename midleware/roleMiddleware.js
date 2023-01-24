const { secret } = require("../config");
const jwt = require("jsonwebtoken");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(400).json({ message: "User is not autorizated" });
      }

      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res
          .status(400)
          .json({ message: "User doesn't have permisions" });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "User is not autorizated" });
    }
  };
};
