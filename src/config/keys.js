const keys = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT: process.env.SALT
};

if (process.env.NODE_ENV === "development") {
  keys.MONGO_URI = "mongodb://localhost/biross";
}

module.exports = keys;
