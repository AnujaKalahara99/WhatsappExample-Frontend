import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardHeader,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToSelected,
  removeFromSelected,
  getAllTags,
  filterByCampaignID,
  filterByTags,
} from "../../features/contacts/contactSlice";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const SelectContacts = () => {
  const dispatch = useDispatch();

  // const [selected, setLeft] = useState([0, 1, 2, 3]);
  // const [notSelected, setRight] = useState([4, 5, 6, 7]);
  const {
    filteredSelectedContacts: selected,
    filteredNonSelectedContacts: notSelected,
    allFilterTags,
    isError,
    isLoading,
    message,
  } = useSelector((state) => state.contacts);

  // const selected = [];
  // const notSelected = [];

  useEffect(() => {
    dispatch(filterByCampaignID(2));
    dispatch(getAllTags());
  }, [dispatch]);

  const [checked, setChecked] = useState([]);
  // const selected = filteredSelectedContacts.map((con) => con.wtsp);
  // const notSelected = filteredNonSelectedContacts.map((con) => con.wtsp);

  //const selected = useSelector(
  //  (state) => state.contacs.filteredSelectedContacts
  //);
  // const notSelected = useSelector(
  //   (state) => state.contacs.filteredNonSelectedContacts
  // );

  const leftChecked = intersection(checked, selected);
  const rightChecked = intersection(checked, notSelected);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    // setRight(notSelected.concat(leftChecked));
    // setLeft(not(selected, leftChecked));
    dispatch(removeFromSelected(leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    // setLeft(selected.concat(rightChecked));
    // setRight(not(notSelected, rightChecked));
    dispatch(addToSelected(rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 1, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  if (isLoading) return <div>loading</div>;

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item>{customList("Choices", selected)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Chosen", notSelected)}</Grid>
    </Grid>
  );
};

export default SelectContacts;
