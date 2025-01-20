import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  SvgIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { postData } from "../../util/index";

// User login Url
const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`;

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = (data) => {
    if (data && data.user) {
      const inputData = {
        id: data.user.id,
        name: data.user.name,
        token: data.token,
        isLoggedIn: true,
      };
      navigate("/myplanner", { state: inputData });
    } else {
      navigate("/home");
    }
  };

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
      setFormValid("Email is invalid.Please enter Email");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid("Please enter Password");
      return;
    }
    setFormValid(null);
    const requestBody = {
      email: emailInput,
      password: passwordInput,
    };
    loginUser(URL, requestBody);
  };

  async function loginUser(URL, requestBody) {
    try {
      const myData = await postData(URL, requestBody);
      if (myData) {
        // TODO Set User, City and State
        handleClose(myData);
      }
      console.log(myData);
      return true;
    } catch (error) {
      setFormValid("Invalid email or password, login failed");
      return false;
    }
  }

  const handleLoginClickShowPassword = () => setShowPassword((show) => !show);

  const handleLoginMouseDownPassword = (event) => {
    event.preventDefault();
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
          onClose={null}
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
              width: "initial",
              height: "3rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000"
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
            variant="h5"
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
            Log In
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
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              width: 400,
              height: 1,
            }}
          >
            <Typography color="white" variant="h6" textAlign="center">
              {" "}
              Not a member yet?{"    "}
              <Link href="/signup" variant="h6" style={{ color: "white" }}>
                Sign Up
              </Link>
            </Typography>
            <TextField
              sx={{
                backgroundColor: "white",
                borderRadius: "1rem",
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontSize: "20px",
                  height: "1em",
                  borderRadius: "1rem !important",
                  "&:-webkit-autofill": {
                    color: "#000000",
                    //fontSize: "18px",
                    backgroundColor: "white !important",
                    borderRadius: "1rem !important",
                    WebkitBoxShadow: "0 0 0 100px white inset",
                  },
                },
                "& .MuiFormLabel-root": {
                  fontSize: "20px",
                  fontWeight: "100",
                  lineHeight: "1em",
                },
                //border: "white",
                // backgroundColor: "white",
                //borderRadius: "1rem",
                //"& .MuiInputBase-input": {
                // color: (theme) => theme.palette.text.tertiary,
                //fontSize: (theme) => theme.typography.body2.fontSize,
                //},
                /*"& .MuiInputBase-root": {
                  "&:before": {
                    borderBottom: "none",
                  },
                  "&:hover:before": {
                    borderBottom: "none",
                  },
                  "&:after": {
                    borderBottom: "none",
                  },
                },*/
              }}
              id="email"
              error={emailError}
              label="Email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              onBlur={handleLoginEmail}
              variant="filled"
              fullWidth
              required
              size="small"
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              sx={{
                backgroundColor: "white",
                borderRadius: "1rem",
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontSize: "20px",
                  height: "1em",
                },
                "& .MuiFormLabel-root": {
                  fontSize: "18px",
                  fontWeight: "100",
                  lineHeight: "1em",
                },
              }}
              //border: "white",
              //backgroundColor: "white",
              //borderRadius: "1rem",

              //"& .MuiInputBase-root": {
              // "&:before": {
              //  borderBottom: "none",
              //},
              // "&:hover:before": {
              // borderBottom: "none",
              //},
              //"&:after": {
              // borderBottom: "none",
              //},
              //},
              //}}
              error={passwordError}
              label="Password"
              variant="filled"
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              onBlur={handleLoginPassword}
              fullWidth
              required
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleLoginClickShowPassword}
                      onMouseDown={handleLoginMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
            <Typography>
              <Link
                href="/forgotpassword"
                variant="body2"
                style={{ color: "white" }}
              >
                Forgot Password
              </Link>
            </Typography>
            <Typography>
              <Button
                onClick={handleLoginSubmit}
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </Typography>
            <Typography component={"div"}>
              {formValid && <Alert severity="error">{formValid}</Alert>}{" "}
            </Typography>
            <Typography component={"div"}>
              {success && <Alert severity="success">{success}</Alert>}
            </Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
export default Login;
