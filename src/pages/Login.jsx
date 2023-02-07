import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [isLoading, isSuccess, isError, message, user, dispatch, navigate]);

  const [formData, setFormData] = useState({
    email: "apk@gmail.com",
    password: "1234",
  });

  const { email, password } = formData;

  const onInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#2ac4ff" };
  const btnstyle = { margin: "32px 0" };
  const inputStyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} />
          <h2>Login</h2>
        </Grid>
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
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={onSubmit}
        >
          Login
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
