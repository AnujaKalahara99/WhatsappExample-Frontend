import axios from "axios";

const cloud = "https://kind-red-wombat-yoke.cyclic.app";
const local = "http://localhost:4000";

const createSampleMessage = (
  userId,
  contact,
  isRecieved,
  isRead,
  header,
  body,
  footer,
  time
) => {
  return {
    userId,
    contact,
    isRecieved,
    isRead,
    header,
    body,
    footer,
    time,
  };
};
const messageLog = [
  createSampleMessage(
    3,
    "94763891917",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94763891917",
    true,
    false,
    null,
    "frfhrfeswsdw",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94763891917",
    true,
    false,
    null,
    "cdjcsrgtggtgojrkfnkejbhdw",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94768608824",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94768608824",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94768608824",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94768608824",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94779151626",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94779151626",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
  createSampleMessage(
    3,
    "94779151626",
    false,
    false,
    null,
    "yfgyf3yff3f",
    "",
    "10:30"
  ),
];

const getAll = async (userId, token) => {
  const all = messageLog.filter((message) => message.userId === userId);
  return all;
};

const getContactMessages = async (userId, token, contact) => {
  const response = await axios.get(`${cloud}/api/wtsp/messages`, {
    params: { contact, userId },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const messagesService = { getAll, getContactMessages };

export default messagesService;
