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

const createContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${cloud}/api/contacts`, contacts, config);

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

  const response = await axios.get(`${cloud}/api/contacts/`, config);
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
const getRecentMessageFromAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(
    `${cloud}/api/contacts/recentMessages`,
    config
  );
  return response.data;
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
