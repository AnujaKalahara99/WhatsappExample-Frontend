import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "Anuja",
    email: "apk@gmail.com",
    password: "1234",
    password2: "1234",
  });

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) console.log(message);
    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const onInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "32px 0" };
  const inputStyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} />
          <h2>Register</h2>
        </Grid>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          style={inputStyle}
          fullWidth
          required
          onChange={onInput}
          value={name}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          style={inputStyle}
          fullWidth
          required
          onChange={onInput}
          value={email}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          style={inputStyle}
          fullWidth
          required
          onChange={onInput}
          value={password}
        />
        <TextField
          name="password2"
          label="Password again"
          type="password"
          variant="outlined"
          style={inputStyle}
          fullWidth
          required
          onChange={onInput}
          value={password2}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={onSubmit}
        >
          Register
        </Button>
      </Paper>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </Grid>
  );
};

export default Register;
