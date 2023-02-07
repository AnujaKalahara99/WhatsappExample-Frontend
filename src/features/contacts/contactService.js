export const contacts = [
  {
    id: 0,
    userID: 3,
    campaignIDs: [2],
    name: "Anuja",
    wtsp: "94763891917",
    sms: "94763891917",
    email: "a.p.kalhara@gmail.com",
    tags: ["Male", "Apple"],
  },
  {
    id: 1,
    userID: 3,
    campaignIDs: [2],
    name: "Induwara",
    wtsp: "94768608824",
    tags: ["Male", "Apple", "Orange"],
  },
  {
    id: 2,
    userID: 3,
    campaignIDs: [2],
    name: "Amma",
    wtsp: "94779151626",
    email: "vasanthanandasiri1@gmail.com",
    tags: ["Female"],
  },
  {
    id: 2,
    userID: 3,
    campaignIDs: [2],
    name: "",
    wtsp: "94771151643",
    email: "",
    tags: ["Apple", "Orange"],
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

const selectContacts = async (userId, campaignId) => {
  const all = contacts.filter((contact) => contact.userID === userId);
  const selected = [];
  const nonSelected = [];
  all.forEach((contact) => {
    if (contact.campaignIDs.includes(campaignId)) selected.push(contact.wtsp);
    else nonSelected.push(contact.wtsp);
  });
  return {
    selected,
    nonSelected,
  };
};

const selectContactsByTags = async (contactList, filterTags) => {
  // const selected = [];
  // const nonSelected = [];
  // contactList.forEach((contact) => {
  //   if (contact.tags.includes(filterTags)) selected.push(contact.wtsp);
  //   else nonSelected.push(contact.wtsp);
  // });
  // return {
  //   selected,
  //   nonSelected,
  // };
};

const getAllTags = async (userId) => {
  return tags.filter((tag) => tag.userID === userId);
};

//not user specific
const addToSelected = async (add, selected, nonSelected) => {
  console.log(`add ${add} selected ${selected} nonSelected ${nonSelected}`);
  return {
    selected: union(selected, add),
    nonSelected: not(nonSelected, add),
  };
};

const removeFromSelected = async (remove, selected, nonSelected) => {
  console.log(
    `remove ${remove} selected ${selected} nonSelected ${nonSelected}`
  );
  return {
    selected: not(selected, remove),
    nonSelected: union(nonSelected, remove),
  };
};

const contactService = {
  selectContacts,
  getAllTags,
  selectContactsByTags,
  addToSelected,
  removeFromSelected,
};
export default contactService;
