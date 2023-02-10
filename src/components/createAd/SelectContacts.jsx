import {
  Box,
  Grid,
  Checkbox,
  Button,
  Divider,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToSelected,
  removeFromSelected,
  getAllTags,
  filterByCampaignID,
  filterByTags,
} from "../../features/contacts/contactSlice";

const SelectContacts = () => {
  const dispatch = useDispatch();

  const {
    filteredSelectedContacts: filteredSelected,
    filteredNonSelectedContacts: filteredNotSelected,
    selectedContacts: selected,
    nonSelectedContacts: notSelected,
    allFilterTags,
    isError,
    isLoading,
    message,
  } = useSelector((state) => state.contacts);

  const campaign = useSelector((state) => state.campaigns.selectedCampaign);

  useEffect(() => {
    if (campaign) dispatch(filterByCampaignID(campaign.id));
    dispatch(getAllTags());
  }, [dispatch, campaign]);

  const [checked, setChecked] = useState([]);
  const [leftFilterTags, setLeftFilterTags] = useState([]);
  const [rightFilterTags, setRightFilterTags] = useState([]);

  const leftChecked = intersection(checked, filteredSelected);
  const rightChecked = intersection(checked, filteredNotSelected);
  const selectedContactsName = "Selected Contacts";
  const notSelectedContactsName = "Not Selected Contacts";

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }

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
    dispatch(removeFromSelected(leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    dispatch(addToSelected(rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleFilter = (tags, name) => {
    if (name === selectedContactsName) {
      setLeftFilterTags(tags);
      dispatch(
        filterByTags({
          tags: tags.map((tag) => tag.label),
          list: selected,
          isFilteringSelected: true,
        })
      );
    } else {
      setRightFilterTags(tags);
      dispatch(
        filterByTags({
          tags: tags.map((tag) => tag.label),
          list: notSelected,
          isFilteringSelected: false,
        })
      );
    }
  };

  function filterTable(title, items) {
    return (
      <Box key={title}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">{`${numberOfChecked(items)}/${
            title === selectedContactsName
              ? selected.length
              : notSelected.length
          }`}</Typography>
          <Typography variant="body2">{title}</Typography>
          <Autocomplete
            sx={{ maxWidth: "70%", minWidth: "100px" }}
            multiple
            disablePortal
            id={`filterTags ${title}`}
            options={allFilterTags}
            filterSelectedOptions
            onChange={(e, value) => handleFilter(value, title)}
            value={
              title === selectedContactsName ? leftFilterTags : rightFilterTags
            }
            renderInput={(params) => (
              <TextField {...params} label="Filter Tags" variant="standard" />
            )}
          />
        </Box>
        <Divider />
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: "500px" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={
                      numberOfChecked(items) === items.length &&
                      items.length !== 0
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
                </TableCell>
                <TableCell className="fw-bold">Number</TableCell>
                <TableCell className="fw-bold" align="right">
                  Tags
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((value) => {
                const labelId = `transfer-list-all-item-${value.wtsp}-label`;
                return (
                  <TableRow
                    hover
                    onClick={handleToggle(value)}
                    role="checkbox"
                    aria-checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    key={value.wtsp}
                    selected={checked.indexOf(value) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        color="primary"
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {value.wtsp}
                    </TableCell>
                    <TableCell align="right">{value.tags}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (isLoading || isError)
    return (
      <Box>
        <Typography variant="h5">Select Contacts</Typography>
        {isError && <Typography>{message}</Typography>}
        {isLoading && <Typography>Loading</Typography>}
      </Box>
    );

  return (
    <Box>
      <Typography variant="h5">Select Contacts</Typography>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item>{filterTable(selectedContactsName, filteredSelected)}</Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center">
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
          </Grid>
        </Grid>
        <Grid item>
          {filterTable(notSelectedContactsName, filteredNotSelected)}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectContacts;
