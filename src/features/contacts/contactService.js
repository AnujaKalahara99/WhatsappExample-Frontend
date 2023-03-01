import axios from "axios";
import {
  contacts,
  tags,
  addToSelectedLocal,
  removeFromSelectedLocal,
  selectContactsByTagsLocal,
} from "./contactServiceLocal";

const cloud = "https://kind-red-wombat-yoke.cyclic.app";
const local = "http://localhost:4000";
const maxLength = 1000; //if exceed the process will be passed to backend

const createContacts = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const contactList = contacts.map((con) => {
    con.userId = userId;
    return con;
  });
  const response = await axios.post(
    `${cloud}/api/contacts`,
    contactList,
    config
  );

  return response.data;
};

const selectContacts = async (token, filters) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      filters,
    },
  };
  console.log(`${cloud}/api/contacts/${filters.userId}`);
  const response = await axios.get(
    `${cloud}/api/contacts/${filters.userId}`,
    config
  );
  return response.data;
};

const selectContactsByTags = async (
  token,
  filterTags,
  contactList,
  isFilteringSelected
) => {
  if (contactList.length < maxLength) {
    return selectContactsByTagsLocal(
      filterTags,
      contactList,
      isFilteringSelected
    );
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      filterTags,
      contactList,
    },
  };
  const response = await axios.get(
    `${cloud}/api/contacts/filterByTags`,
    config
  );
  return {
    filtered: response.data,
    isFilteringSelected,
  };
};

const getAllTags = async (userId) => {
  return tags.filter((tag) => tag.userID === userId);
};

//not user specific
const addToSelected = async (
  add,
  selected,
  nonSelected,
  filteredS,
  filteredNS
) => {
  return addToSelectedLocal(add, selected, nonSelected, filteredS, filteredNS);
};

const removeFromSelected = async (
  remove,
  selected,
  nonSelected,
  filteredS,
  filteredNS
) => {
  return removeFromSelectedLocal(
    remove,
    selected,
    nonSelected,
    filteredS,
    filteredNS
  );
};

//For Reply Window
const getRecentMessageFromAll = (userId) => {
  const all = contacts.filter(
    (contact) => contact.userId === userId && contact.lastMessage !== ""
  );
  all.map((contact) => {
    return {
      wtsp: contact.wtsp,
      name: contact.name,
      lastMessage: contact.lastMessage,
      lastMessageTime: contact.lastMessageTime,
      lastConversationTime: contact.lastConversationTime,
      unreadMessageCount: contact.unreadMessageCount,
    };
  });
  return all;
};

const contactService = {
  createContacts,
  selectContacts,
  getAllTags,
  selectContactsByTags,
  addToSelected,
  removeFromSelected,
  getRecentMessageFromAll,
};
export default contactService;
