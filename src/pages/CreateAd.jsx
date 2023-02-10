import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import Masonry from "react-masonry-css";
import SelectCampaign from "../components/createAd/SelectCampaign";
import SelectContacts from "../components/createAd/SelectContacts";
import SelectTemplate from "../components/createAd/SelectTemplate";
import SendAndError from "../components/createAd/SendAndError";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  //textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreateAd = () => {
  return (
    <Box sx={{ width: "99%" }}>
      <Masonry
        breakpointCols={{ default: 2, 1100: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <Item>
          <SelectCampaign />
        </Item>
        <Item>
          <SelectTemplate />
        </Item>
        <Item>
          <SelectContacts />
        </Item>
      </Masonry>
      <SendAndError />
    </Box>
  );
};
export default CreateAd;
