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
export {
  postCreateNewUser,
  getAllUserService,
  putUpdateUser,
  deleteUserService,
};
