const controller = {};

controller.login = async function(req, res, next) {
  try {
    res.json({
      data: {},
      status: "success",
      message: "User logged in successfully"
    });
  } catch (e) {
    next({ message: e, status: 400 });
  }
};

module.exports = controller;
