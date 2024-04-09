import model from "./model.js";

//3.5.4
export const findAllUsers = () => model.find();
//3.5.7
export const findUserById = (id) => model.findById(id);
export const createUser = (user) => {
    //3.5.5
    delete user._id
    return model.create(user);
}

//3.5.3 
export const updateUser = (id, user) =>
  model.updateOne({ _id: id }, { $set: user });

//3.5.6
export const deleteUser = (id) => model.deleteOne({ _id: id });
export const findUserByEmail = (email) =>
  model.findOne({
    email: email,
  });

export const findUserByCredentials = (username, password) =>
  model.findOne({
    username: username,
    password: password,
  });

  //3.5.8
  export const findUsersByRole = (role) => model.find({ role: role });

  