import { TextField } from "@mui/material";
import reactStringReplace from "react-string-replace";

const StringVariableReplace = (props) => {
  return reactStringReplace(props.children, /({{\d+}})/g, (match, i) => (
    <TextField
      id={i.toString()}
      key={i.toString()}
      placeholder={match}
      size="small"
      variant="standard"
      InputLabelProps={{ color: "primary" }}
      onChange={(value) => props.handle(value, Math.ceil(i / 2) - 1)}
    />
  ));
};

export default StringVariableReplace;
