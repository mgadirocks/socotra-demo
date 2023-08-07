import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Login = (props) => {
  //   const [hostName, setHostName] = useState();
  //   const [userName, setUserName] = useState("alice.lee");
  //   const [password, setPassword] = useState("socotra");

  //   const updateHostName = (e) => {
  //     setHostName(e.target.value);
  //   };

  //   const updateUsername = (e) => {
  //     setUserName(e.target.value);
  //   };

  //   const updatePassword = (e) => {
  //     setPassword(e.target.value);
  //   };

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = {
      hostname: data.get("hostname"),
      username: data.get("username"),
      password: data.get("password"),
    };
    if (params.hostname && params.username && params.password) {
      props.onLogin(params);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="hostname"
              label="Host Name"
              name="hostname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              defaultValue={"alice.lee"}
              label="Username"
              name="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              defaultValue={"socotra"}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
