import axios from "../utils/axioisCustomize";

const postCreateNewUser = (email, password, UserName, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", UserName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
const putUpdateUser = (id, UserName, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", UserName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const getAllUserService = () => {
  return axios.get("api/v1/participant/all");
};
const deleteUserService = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (userEmail, userPassword) => {
  return axios.post(`api/v1/login`, {
    email: userEmail,
    password: userPassword,
  });
};
const postRegister = (username, userEmail, userPassword) => {
  return axios.post(`api/v1/register`, {
    username: username,
    email: userEmail,
    password: userPassword,
  });
};
export {
  postCreateNewUser,
  getAllUserService,
  putUpdateUser,
  deleteUserService,
  getUserWithPaginate,
  postLogin,
  postRegister,
};
