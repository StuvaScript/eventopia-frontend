import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Link from "@mui/material/Link";
import { Route, Routes } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const handleUsername = () => {
    if (
      !usernameInput ||
      usernameInput.length < 5 ||
      usernameInput.length > 15
    ) {
      setUsernameError(true);
      return;
    }
    setUsernameError(false);
  };

  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 15
    ) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess();
    if (usernameError || !usernameInput) {
      setFormValid(
        "Username should be in 5-15 characters long.Please Re-Enter Username "
      );
      return;
    }

    if (emailError || !emailInput) {
      setFormValid("Email is inValid.Please Re-Enter Email");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid(
        "Password should be in 5-15 characters.Please Re-Enter Password"
      );
      return;
    }
    setFormValid(null);
    setSuccess("Form submitted successfully");

    console.log("Name:" + usernameInput);
    console.log("Email:" + emailInput);
    console.log("Password:" + passwordInput);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            "& > :not(style) ~ :not(style)": {
              ml: 2,
            },
          }}
        >
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Chip
              icon={<FaceIcon />}
              label="Sign Up"
              color="primary"
              variant="outlined"
            />
            <p>
              {" "}
              Already a member?{"    "}
              {/* <Button component={Link} to="/login" variant="text">
                Login
              </Button> */}
              {/* <Link component={RouterLink} to="login" underline="always">
                Login
              </Link> */}
              <Link href="/login" variant="body2">
                Login
              </Link>
              {/* <Grid container justify="flex-end">
                <Grid item>
                  Already a member?{"    "}
                  <Link href="/login" variant="body2">
                    Login
                  </Link>
                </Grid>
              </Grid> */}
              {/* <Button onClick={() => navigate("/login")} variant="text">
                Login
              </Button> */}
            </p>
            <span>
              <p>
                <TextField
                  id="standard-basic"
                  error={usernameError}
                  label="Username"
                  value={usernameInput}
                  onChange={(event) => setUsernameInput(event.target.value)}
                  onBlur={handleUsername}
                  variant="standard"
                  fullWidth
                />
              </p>
              <p>
                <TextField
                  id="standard-basic"
                  error={emailError}
                  label="Email"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                  onBlur={handleEmail}
                  variant="standard"
                  fullWidth
                />
              </p>
              <p>
                <FormControl sx={{ width: "100%" }} variant="standard">
                  <InputLabel
                    error={passwordError}
                    htmlFor="standard-adornment-password"
                  >
                    Password
                  </InputLabel>
                  <Input
                    fullWidth
                    error={passwordError}
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(event) => setPasswordInput(event.target.value)}
                    onBlur={handlePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </p>
              <p>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  startIcon={<LoginIcon />}
                >
                  SIGN UP
                </Button>
              </p>
              <p>{formValid && <Alert severity="error">{formValid}</Alert>}</p>
              <p>{success && <Alert severity="success">{success}</Alert>}</p>
            </span>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
export default SignUp;
