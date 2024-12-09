import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function Forgot() {
  const [emailInput, setEmailInput] = useState();

  const [emailError, setEmailError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const handleLoginEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setSuccess();

    if (emailError || !emailInput) {
      setFormValid("Email is inValid.Please Re-Enter Email");
      return;
    }

    setFormValid(null);
    setSuccess("Form submitted successfully");

    console.log("Email:" + emailInput);
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifycontent: "center",
            alignItems: "center",
            "& > :not(style) ~ :not(style)": {
              ml: 2,
            },
          }}
        >
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Chip
              label="Forgot Password ?"
              color="primary"
              variant="outlined"
              justifyContent="center"
            />
            <span>
              <p>
                Enter your email to get a password reset link
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
                <Button
                  onClick={handleLoginSubmit}
                  fullWidth
                  variant="contained"
                  startIcon={<LoginIcon />}
                >
                  Send reset Link
                </Button>
              </p>
              <p>
                <Link href="/login" variant="body2">
                  Back to Login
                </Link>
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
export default Forgot;
