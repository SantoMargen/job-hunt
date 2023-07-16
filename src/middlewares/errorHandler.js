const errorHandler = (err, req, res, next) => {
  // console.log(err, " ERROR=======");
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "MAXIMUM_DATA":
      res.status(400).json({ message: "Quota bidang is full" });
      break;
    case "NOTFOUND":
      res.status(404).json({ message: "Data notfound" });
      break;
    case "USER_NOT_FOUND":
      res.status(404).json({ message: "User notfound" });
      break;
    case "EMAIL_ALREADY_EXIST":
      res.status(400).json({ message: "Email or Username already exist" });
      break;
    case "EMAIL_REQUIRED":
      res.status(400).json({ message: "Email required" });
      break;
    case "PASSWORD_REQUIRED":
      res.status(400).json({ message: "Password required" });
      break;
    case "AUTHENTICATION":
      res.status(401).json({ message: "Invalid Email/Password" });
      break;
    case "UNAUTHENTICATED":
      res.status(401).json({ message: "Please Login First" });
      break;
    case "NAME_ALREADY_EXIST":
      res.status(500).json({ message: " Nama telah digunakan" })
      break
    case "INVALID_USERNAME":
      res.status(500).json({ message: "Invalid username" });
      break;
    case "MAX_SERTIFICATION":
      res.status(400).json({ message: "quota limit has been reached" })
      break
    case "IMAGE_SIZE_TO_BIG":
      res.status(500).json({ message: "Image to large" });
      break;
    case "VALIDATION_ERROR":
      res.status(500).json({ message: "Badrequest" });
      break;
    case "TO_MUCH_LEVEL":
      res.status(500).json({ message: "Terlalu banyak Level Pekerjaan" })
    default:
      res.status(500).json({ message: "internal server error" });
      break;
  }
};

module.exports = errorHandler;
