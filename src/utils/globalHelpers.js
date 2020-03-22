const mongoose = require("mongoose");

const helpers = {};

helpers.isValidURL = function(text) {
  return text.startsWith("http");
};

helpers.handleMongooseError = function(response) {
  let returnResponse = {};

  if (response.name === "ValidationError") {
    const errorsArray = [];
    for (item in response.errors) {
      errorsArray.push(response.errors[item].message);
    }

    returnResponse.message = errorsArray;
  } else if ("message" in response) {
    returnResponse = { message: response.message };
  } else if (Array.isArray(response)) {
    returnResponse.message = response;
  }

  return returnResponse;
};

helpers.generateId = function(length, optionalChars) {
  let chars = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (optionalChars) chars = optionalChars;

  let mask = "";
  let result = "";

  if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (chars.indexOf("#") > -1) mask += "0123456789";

  for (let i = length; i > 0; i--) {
    result += mask[Math.floor(Math.random() * mask.length)];
  }

  return result;
};

helpers.isValidObjectId = function(id) {
  return mongoose.Types.ObjectId.isValid(id);
};

helpers.isNullOrUndefined = function(value) {
  if (value === undefined || value === null || value === "") return true;
};

module.exports = helpers;
