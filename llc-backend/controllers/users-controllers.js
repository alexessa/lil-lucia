const HttpError = require("../models/http-error");
const Users = require("../models/users");

const getUsers = async (req, res, next) => {
  const allUsers = await Users.findAll();

  if (allUsers.length <= 0) {
    return next(new HttpError("Could not find any users", 404));
  }

  res.status(200).json({ users: allUsers });
};

const signup = async (req, res, next) => {
  const { FirstName, LastName, Address, Email, Password } = req.body;

  const identifiedUser = await Users.findOne({ where: { Email: Email } }).catch(
    (errors) => {
      return next(new HttpError(errors.message, 500));
    }
  );

  if (identifiedUser) {
    return next(
      new HttpError("User already exists, please log in instead", 422)
    );
  }

  const createdUser = await Users.create({
    FirstName,
    LastName,
    Address,
    Email,
    Password,
    IsAdmin: false,
  }).catch((err) => {
    return next(new HttpError(err.message, 422));
  });

  res.status(201).json({ user: createdUser });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { Email, Password } = req.body;

  const identifiedUser = await Users.findOne({ where: { Email: Email } }).catch(
    (errors) => {
      return next(
        new HttpError(
          "There is an issue with the log in, please try again",
          500
        )
      );
    }
  );

  if (!identifiedUser || identifiedUser.Password !== Password) {
    return next(
      new HttpError("There is an issue with the log in, please try again", 401)
    );
  }

  res.json({ message: "Logged in successfully", user: identifiedUser });
};

const getUserProfile = async (req, res, next) => {
  const userId = req.params.uid;

  const identfiedUser = await Users.findOne({ where: { UserID: userId } }).catch(
    (err) => {
      return next(
        new HttpError("There was an issue fetching the user profile", 422)
      );
    }
  );

  if (!identfiedUser) {
    return next(
      new HttpError("There was an issue fetching the user profile", 422)
    );
  }

  res.status(200).json({ user: identfiedUser });
};

const updateUserProfile = async (req, res, next) => {
  const userId = req.params.uid;
  const { FirstName, LastName, Address } = req.body;

  await Users.update(
    { FirstName: FirstName, LastName: LastName, Address: Address },
    { where: { UserID: userId } }
  ).catch((err) => {
    return new HttpError(err.message, 422);
  });

  res.json(200).json({ message: "User has been updated successfully" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
