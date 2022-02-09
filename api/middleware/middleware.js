const User = require("../users/users-model");

function logger(req, res, next) {
  console.log(req.url, req.method, new Date());
  next();
}

async function validateUserId(req, res, next) {
  const userId = await User.getById(req.params.id);

  try {
    if (userId) {
      req.user = userId;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
};
