import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  SvgIcon,
} from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import { TypeSpecimenOutlined } from "@mui/icons-material";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function Forgot() {
  const [emailInput, setEmailInput] = useState();

  const [emailError, setEmailError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

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
      <Box
        component="form"
        sx={{
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            background: "#000",
            "& .MuiPaper-root": {
              background: "#000",
              border: ".3rem solid blue",
              borderRadius: "1.5rem",
            },
            "& .MuiBackdrop-root": {
              backgroundColor: "black",
            },
          }}
        >
          <SvgIcon
            style={{
              margin: ".5rem",
              width: "30rem",
              height: "3rem",
              //display: "flex",
              //flexWrap: "wrap",
              //justifyContent: "center",
              //alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#FFFFFF"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12,0.5C5.7,0.5,0.5,5.7,0.5,12c0,6.3,5.2,11.5,11.5,11.5S23.5,18.3,23.5,12C23.5,5.7,18.3,0.5,12,0.5z M16.8,8.8v5v0.4v1.2  c0,0.8-0.6,1.4-1.4,1.4h-0.6c-0.8,0-1.4-0.6-1.4-1.4v-0.6c0-0.8,0.6-1.4,1.4-1.4h1.1V9.4l-5.2,1.6v4.3v0.8v0.8  c0,0.8-0.6,1.4-1.4,1.4H8.6c-0.8,0-1.4-0.6-1.4-1.4v-0.6c0-0.8,0.6-1.4,1.4-1.4h1.1v-4.1V8.1c0-0.2,0.1-0.4,0.3-0.5l6.2-1.9  c0.1,0,0.3,0,0.4,0.1c0.1,0.1,0.2,0.2,0.2,0.4V8.8z"
              />
            </svg>
          </SvgIcon>
          <DialogTitle
            sx={{
              padding: ".2rem",
              textAlign: "center",
              color: "white",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Forgot Password ?
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              color: "white",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: 400,
              height: 1,
            }}
          >
            <Typography color="white" textAlign="center">
              Enter your email to get a password reset link
            </Typography>
            <TextField
              sx={{
                border: "white",
                backgroundColor: "white",
                borderRadius: "1rem",
                "& .MuiInputBase-root": {
                  "&:before": {
                    borderBottom: "none",
                  },
                  "&:hover:before": {
                    borderBottom: "none",
                  },
                  "&:after": {
                    borderBottom: "none",
                  },
                },
              }}
              id="email"
              error={emailError}
              label="Email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              onBlur={handleLoginEmail}
              variant="filled"
              fullWidth
              size="small"
            />
            <Typography>
              <Button
                onClick={handleLoginSubmit}
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
              >
                Send reset Link
              </Button>
            </Typography>
            <Typography>
              <Link href="/login" variant="body2" style={{ color: "white" }}>
                Back to Login
              </Link>
            </Typography>
            <Typography>
              {formValid && <Alert severity="error">{formValid}</Alert>}
            </Typography>
            <Typography>
              {success && <Alert severity="success">{success}</Alert>}
            </Typography>
          </DialogContent>
        </Dialog>
      </Box>
      {/* <Container>
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
      </Container> */}
    </>
  );
}
export default Forgot;
