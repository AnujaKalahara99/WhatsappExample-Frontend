const campaigns = [
  {
    name: "Hello World",
    description: "Nothing to see",
    contacts: ["94763891917", "94779151626"],
  },
  {
    name: "Goodbye World",
    description: "Bla Bla Bla",
    contacts: ["94763891917"],
  },
];

const getAll = async (userData) => {
  return campaigns;
};

const campaignService = { getAll };
export default campaignService;
