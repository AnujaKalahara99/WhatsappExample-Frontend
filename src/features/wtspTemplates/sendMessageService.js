import axios from "axios";

const cloud = "https://kind-red-wombat-yoke.cyclic.app";
const local = "http://localhost:4000";

const send = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    //data: messageData ? messageData : null,
  };

  const response = await axios.post(
    `${cloud}/api/wtsp/messages`,
    messageData,
    config
  );

  return response.data;
};

const sendMessageService = { send };

export default sendMessageService;
