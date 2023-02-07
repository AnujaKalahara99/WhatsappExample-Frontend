import axios from "axios";

const cloud = "https://kind-red-wombat-yoke.cyclic.app";
const local = "http://localhost:4000";

const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${cloud}/api/wtsp/templates`, config);

  return response.data;
};

const templateService = { getAll };

export default templateService;
