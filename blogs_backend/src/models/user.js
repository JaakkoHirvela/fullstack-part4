const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    // Never reveal the password hash.
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
