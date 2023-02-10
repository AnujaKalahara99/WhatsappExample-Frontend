import axios from "axios";

const registerAPI = async (userData) => {
  const response = await axios.post(
    "https://kind-red-wombat-yoke.cyclic.app/api/users/",
    userData
  );
  if (response.data)
    localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const loginAPI = async (userData) => {
  const response = await axios.post(
    "https://kind-red-wombat-yoke.cyclic.app/api/users/login",
    userData
  );
  if (response.data)
    localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const logoutAPI = () => {
  localStorage.removeItem("user");
};

const authService = { registerAPI, loginAPI, logoutAPI };
export default authService;
