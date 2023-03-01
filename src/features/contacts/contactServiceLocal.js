export const contacts = [
  {
    id: 0,
    userId: "3",
    campaignIds: ["1", "2"],
    name: "Anuja",
    wtsp: "94763891917",
    sms: "94763891917",
    email: "a.p.kalhara@gmail.com",
    tags: ["Male", "Apple"],
    lastMessage: "These Hamburgers are extremely violent!",
    lastMessageTime: null,
    lastConversationTime: "",
    unreadMessageCount: 2,
  },
  {
    id: 1,
    userId: "3",
    campaignIds: ["1", "2"],
    name: "Induwara",
    wtsp: "94768608824",
    tags: ["Male", "Apple", "Orange"],
    lastMessage: "It is at that moment he realised how much",
    lastMessageTime: null,
    lastConversationTime: "",
    unreadMessageCount: 1,
  },
  {
    id: 2,
    userId: "3",
    campaignIds: ["2"],
    name: "Amma",
    wtsp: "94779151626",
    email: "vasanthanandasiri1@gmail.com",
    tags: ["Female"],
    lastMessage: "Ofcourse after all it is bla bla bla",
    lastMessageTime: null,
    lastConversationTime: "",
    unreadMessageCount: 1,
  },
  {
    id: 2,
    userId: "3",
    campaignIds: ["2"],
    name: "Unknown",
    wtsp: "94771151643",
    email: "",
    tags: ["Apple", "Orange"],
    lastMessage: "",
    lastMessageTime: null,
    lastConversationTime: "",
    unreadMessageCount: 0,
  },
];

export const tags = [
  {
    userID: 3,
    label: "Male",
  },
  {
    userID: 3,
    label: "Female",
  },
  {
    userID: 3,
    label: "Apple",
  },
  {
    userID: 3,
    label: "Orange",
  },
];

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export const selectContactsLocal = async (userId, campaignId) => {
  const all = contacts.filter((contact) => contact.userID === userId);
  const selected = [];
  const nonSelected = [];
  all.forEach((contact) => {
    if (contact.campaignIDs.includes(campaignId))
      selected.push({ wtsp: contact.wtsp, tags: contact.tags });
    else nonSelected.push({ wtsp: contact.wtsp, tags: contact.tags });
  });
  return {
    selected,
    nonSelected,
  };
};

export const selectContactsByTagsLocal = (
  filterTags,
  contactList,
  isFilteringSelected
) => {
  let filtered = [];
  if (filterTags && filterTags.length !== 0) {
    contactList.forEach((contact) => {
      let found = true;
      filterTags.forEach((tag) => {
        if (contact.tags.indexOf(tag) === -1) {
          found = false;
          return;
        }
      });
      if (found) {
        filtered.push(contact);
      }
    });
  } else {
    filtered = contactList;
  }
  return {
    filtered,
    isFilteringSelected,
  };
};

export const getAllTagsLocal = async (userId) => {
  return tags.filter((tag) => tag.userID === userId);
};

//not user specific
export const addToSelectedLocal = async (
  add,
  selected,
  nonSelected,
  filteredS,
  filteredNS
) => {
  return {
    filteredSelected: union(filteredS, add),
    selected: union(selected, add),
    filteredNonSelected: not(filteredNS, add),
    nonSelected: not(nonSelected, add),
  };
};

export const removeFromSelectedLocal = async (
  remove,
  selected,
  nonSelected,
  filteredS,
  filteredNS
) => {
  return {
    filteredSelected: not(filteredS, remove),
    selected: not(selected, remove),
    filteredNonSelected: union(filteredNS, remove),
    nonSelected: union(nonSelected, remove),
  };
};

//For Reply Window
export const getRecentMessageFromAllLocal = (userId) => {
  const all = contacts.filter(
    (contact) => contact.userID === userId && contact.lastMessage !== ""
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
