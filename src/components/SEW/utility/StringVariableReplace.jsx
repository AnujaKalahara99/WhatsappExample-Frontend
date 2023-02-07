import { TextField } from "@mui/material";
import reactStringReplace from "react-string-replace";

const StringVariableReplace = (props) => {
  return reactStringReplace(props.children, /({{\d+}})/g, (match, i) => (
    <div key={i.toString()} style={{ display: "inline-block" }}>
      {props.replaceWith && (
        <div style={{ display: "inline-block" }}>
          {props.replaceWith[Math.ceil(i / 2) - 1]
            ? props.replaceWith[Math.ceil(i / 2) - 1]
            : ""}
        </div>
      )}
      {!props.replaceWith && (
        <TextField
          id={i.toString()}
          placeholder={match}
          size="small"
          variant="standard"
          InputLabelProps={{ color: "primary" }}
          onChange={(value) => props.handle(value, Math.ceil(i / 2) - 1)}
          value={
            props.textValue[Math.ceil(i / 2) - 1]
              ? props.textValue[Math.ceil(i / 2) - 1]
              : ""
          }
        />
      )}
    </div>
  ));
};

export default StringVariableReplace;
