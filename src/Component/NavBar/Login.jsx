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
import LockIcon from "@mui/icons-material/Lock";
import Link from "@mui/material/Link";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const handleLoginEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handleLoginPassword = () => {
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setSuccess();

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

    console.log("Email:" + emailInput);
    console.log("Password:" + passwordInput);
  };

  const handleLoginClickShowPassword = () => setShowPassword((show) => !show);

  const handleLoginMouseDownPassword = (event) => {
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
              icon={<LockIcon />}
              label="Login"
              color="primary"
              variant="outlined"
              justifyContent="center"
            />
            <span>
              <p>
                {" "}
                Not a member yet?{"    "}
                <Link href="/" variant="body2">
                  Sign Up
                </Link>
                <TextField
                  id="standard-basic"
                  error={emailError}
                  label="Email"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                  onBlur={handleLoginEmail}
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
                    onBlur={handleLoginPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleLoginClickShowPassword}
                          onMouseDown={handleLoginMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </p>
              <p>
                <Link href="/forgot" variant="body2">
                  Forgot Password
                </Link>
              </p>

              <p>
                <Button
                  onClick={handleLoginSubmit}
                  fullWidth
                  variant="contained"
                  startIcon={<LoginIcon />}
                >
                  Login
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
export default Login;
