import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  SvgIcon,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { postData } from "../../util/index";
import states from "../../util/states";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "black",
    color: "white",
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
}));

// User login Url
const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`;

// Optional config
const config = {
  params: {
    startDateTime: "",
    endDateTime: "",
  },
};

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstnameInput, setFirstnameInput] = useState("");
  const [lastnameInput, setLastnameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [cityInput, setCityInput] = useState("");

  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const handleFirstname = () => {
    if (
      !firstnameInput ||
      firstnameInput.length < 3 ||
      firstnameInput.length > 15
    ) {
      setFirstnameError(true);
      return;
    }
    setFirstnameError(false);
  };

  const handleLastname = () => {
    if (
      !lastnameInput ||
      lastnameInput.length < 3 ||
      lastnameInput.length > 15
    ) {
      setLastnameError(true);
      return;
    }
    setLastnameError(false);
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

  const handleCity = () => {
    if (!cityInput) {
      setCityError(true);
      return;
    }
    setCityError(false);
  };

  const [selectedState, setSelectedState] = useState("");

  const handleState = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstnameError || !firstnameInput) {
      setFormValid("Please enter Firstname ");
      return;
    }

    if (lastnameError || !lastnameInput) {
      setFormValid("Please enter Lastname ");
      return;
    }

    if (emailError || !emailInput) {
      setFormValid("Email is invalid.Please enter Email");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid(
        "Password should be in 5-15 characters.Please enter Password"
      );
      return;
    }

    if (cityError || !cityInput) {
      setFormValid("City is invalid.Please enter City");
      return;
    }

    if (!selectedState) {
      setFormValid("State is invalid.Please select State");
      return;
    }

    setFormValid(null);

    console.log("First Name:" + firstnameInput);
    console.log("Last Name:" + lastnameInput);
    console.log("Email:" + emailInput);
    console.log("Password:" + passwordInput);
    console.log("City:" + cityInput);
    console.log("State:" + selectedState);
    // Call to server to post the data
    const requestBody = {
      firstName: firstnameInput,
      lastName: lastnameInput,
      email: emailInput,
      password: passwordInput,
      city: cityInput,
      state: selectedState,
    };
    registerUser(URL, requestBody);
  };

  async function registerUser(URL, requestBody) {
    try {
      const myData = await postData(URL, requestBody);
      //setMessage("Signup completed");
      handleClose(myData);
      console.log(myData);
    } catch (error) {
      setFormValid("Singup failed, please check your input");
      return false;
    }
    return true;
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = (data) => {
    if (data && data.user) {
      const inputData = {
        id: data.user.id,
        name: data.user.name,
        token: data.token,
      };
      navigate("/userhome", { state: inputData });
    } else {
      navigate("/home");
    }
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
            SignUp
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 0,
                top: 5,
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
              gap: 1.2,
              width: 400,
              height: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                variant: "h6",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Already a member?
              <Link href="/login" variant="h6" style={{ color: "white" }}>
                Login
              </Link>
            </Typography>

            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontSize: "20px",
                  height: "1em",
                  borderRadius: "1rem !important",
                  "&:-webkit-autofill": {
                    color: "#000000",
                    backgroundColor: "white !important",
                    borderRadius: "1rem !important",
                    WebkitBoxShadow: "0 0 0 100px white inset",
                  },
                },
                "& .MuiFormLabel-root": {
                  fontSize: "18px",
                  fontWeight: "100",
                  lineHeight: "1em",
                },

                backgroundColor: "white",
                borderRadius: "1rem",
              }}
              id="firstname"
              error={firstnameError}
              label="First Name"
              value={firstnameInput}
              onChange={(event) => setFirstnameInput(event.target.value)}
              onBlur={handleFirstname}
              variant="filled"
              fullWidth
              size="small"
              required
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              sx={{
                fontSize: ".2rem",
                backgroundColor: "white",
                borderRadius: "1rem",
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontSize: "20px",
                  height: "1em",
                  borderRadius: "1rem !important",
                  "&:-webkit-autofill": {
                    color: "#000000",
                    backgroundColor: "white !important",
                    borderRadius: "1rem !important",
                    WebkitBoxShadow: "0 0 0 100px white inset",
                  },
                },
                "& .MuiFormLabel-root": {
                  fontSize: "18px",
                  fontWeight: "100",
                  lineHeight: "1em",
                },
              }}
              id="lastname"
              error={lastnameError}
              label="Last Name"
              value={lastnameInput}
              onChange={(event) => setLastnameInput(event.target.value)}
              onBlur={handleLastname}
              variant="filled"
              fullWidth
              size="small"
              required
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              sx={{
                "& .MuiFormLabel-root": {
                  fontSize: "18px",
                  fontWeight: "100",
                  lineHeight: "1em",
                },
                "& .MuiInputBase-input": {
                  backgroundColor: "white",
                  color: "#000000",
                  fontSize: "18px",
                  height: "1em",
                  borderRadius: "1rem !important",
                  "&:-webkit-autofill": {
                    color: "#000000",
                    backgroundColor: "white !important",
                    borderRadius: "1rem !important",
                    WebkitBoxShadow: "0 0 0 100px white inset",
                  },
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white !important",
                    borderRadius: "1rem !important",
                  },
                },
              }}
              id="email"
              error={emailError}
              label="Email Address"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              onBlur={handleEmail}
              variant="filled"
              fullWidth
              size="small"
              required
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
              error={passwordError}
              label="Password"
              variant="filled"
              type={showPassword ? "text" : "password"}
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              onBlur={handlePassword}
              fullWidth
              required
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />

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
                    backgroundColor: "white !important",
                    borderRadius: "1rem !important",
                    WebkitBoxShadow: "0 0 0 100px white inset",
                  },
                },
                "& .MuiFormLabel-root": {
                  fontSize: "18px",
                  fontWeight: "100",
                  lineHeight: "1em",
                },
              }}
              id="city"
              error={cityError}
              label="City"
              value={cityInput}
              onChange={(event) => setCityInput(event.target.value)}
              onBlur={handleCity}
              variant="filled"
              fullWidth
              required
              size="small"
              InputProps={{ disableUnderline: true }}
            />

            <FormControl
              fullWidth
              size="small"
              variant="filled"
              required
              sx={{
                backgroundColor: "white",
                borderRadius: "1rem",
                "& .MuiInputBase-input": {
                  color: "#000000",
                  fontSize: "20px",
                  height: "1em",
                  minHeight: "1px",
                  paddingTop: "12px",
                  paddingBottom: "2px",
                },
                "& .MuiFormLabel-root": {
                  fontSize: "18px",
                  fontWeight: "100",
                },
              }}
            >
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "220px",
                      scrollbarWidth: "none",
                    },
                  },
                }}
                labelId="state-select-label"
                value={selectedState}
                onChange={handleState}
                label="State"
                disableUnderline
              >
                {states.map((stateItem) => (
                  <MenuItem
                    key={stateItem.code}
                    value={stateItem.code}
                    sx={{
                      fontSize: "0.9rem",
                    }}
                  >
                    {stateItem.name}
                  </MenuItem> //value(stateCode) will be sent to backend
                ))}
              </Select>
            </FormControl>

            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              startIcon={<LoginIcon />}
            >
              SIGN UP
            </Button>
            <Typography component={"div"}>
              {formValid && (
                <Alert
                  severity="error"
                  sx={{
                    "& .MuiAlert-standardError": {
                      backgroundColor: "white",
                      color: "#d32f2f",
                    },
                  }}
                >
                  {formValid}{" "}
                </Alert>
              )}
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
export default SignUp;
