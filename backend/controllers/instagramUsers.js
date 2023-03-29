const instagramUsersRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const InstagramUser = require("../models/instagramUser");

instagramUsersRouter.get("/", async (request, response) => {
  const instagramUsers = await InstagramUser.find({});
  response.json({
    status: "Success",
    numberOfInstagramUsers: instagramUsers.length,
    data: { instagramUsers },
  });
});

instagramUsersRouter.post("/", async (request, response) => {
  const { firstName, lastName, email, phoneNumber } = request.body;

  if (InstagramUser.find({ email: email }) !== null) {
    return response.status(200).json({
      status: "Success",
      message: "User successfully logged in",
    });
  }

  const instagramUser = new InstagramUser({
    firstName,
    lastName,
    email,
    phoneNumber,
  });

  const savedInstagramUser = await instagramUser.save();
  response.status(201).json({
    status: "Success",
    savedInstagramUser,
  });
});

module.exports = instagramUsersRouter;