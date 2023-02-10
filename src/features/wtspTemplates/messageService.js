import axios from "axios";

const send = async (messageData, token) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    //data: messageData ? messageData : null,
  };

  const response = await axios.post(
    "https://kind-red-wombat-yoke.cyclic.app/api/wtsp/messages",
    messageData,
    config
  );

  return response.data;
};

const messageService = { send };

export default messageService;
