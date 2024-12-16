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
    delay: 3000,
  });
};
const postRegister = (username, userEmail, userPassword) => {
  return axios.post(`api/v1/register`, {
    username: username,
    email: userEmail,
    password: userPassword,
  });
};
const getQuizByUser = (userEmail, userPassword) => {
  return axios.get(`api/v1/quiz-by-participant`);
};
const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};
const postCreateNewQuiz = (description, name, type, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", type);
  data.append("quizImage", image);
  return axios.post(`api/v1/quiz`, data);
};
const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};
const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put("api/v1/quiz", data);
};
const deleteQuiz = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`);
};
const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("api/v1/question", data);
};
const postCreateNewAnswerForQuestions = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};
const logout = (email, refresh_token) => {
  return axios.post(`/api/v1/logout`, { email, refresh_token });
};
const getOverView = () => {
  return axios.get(`api/v1/overview`);
};
const changePassword = (current_password, new_password) => {
  return axios.post(`/api/v1/change-password`, {
    current_password,
    new_password,
  });
};
const updateProfile = (username, userImage) => {
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", userImage);
  return axios.post("api/v1/profile", data);
};
const getHistory = () => {
  return axios.get(`api/v1/history`);
};
export {
  postCreateNewUser,
  getAllUserService,
  putUpdateUser,
  deleteUserService,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestions,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  logout,
  getOverView,
  changePassword,
  updateProfile,
  getHistory,
};
