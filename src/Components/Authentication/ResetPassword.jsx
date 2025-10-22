import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../util/index";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Alert from "@mui/material/Alert";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  SvgIcon,
} from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useParams } from "react-router-dom";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/reset-password`;

function ResetPassword() {
  const { resetToken } = useParams();

  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleNewPassword = () => {
    if (
      !newPasswordInput ||
      newPasswordInput.length < 5 ||
      newPasswordInput.length > 15
    ) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleConfirmPassword = () => {
    if (
      !confirmPassword ||
      confirmPassword.length < 5 ||
      confirmPassword.length > 15
    ) {
      setConfirmPasswordError(true);
      return;
    }
    setConfirmPasswordError(false);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPasswordInput.length < 6) {
      setFormValid(
        "Password must be atleast 6 characters.Please enter valid password"
      );
      return;
    }

    if (confirmPassword.length < 6) {
      setFormValid(
        "Confirm password must be atleast 6 characters.Please enter valid confirm password"
      );
      return;
    }

    if (newPasswordInput !== confirmPassword) {
      setFormValid("Passwords doesn't match");
      return;
    }
    setFormValid(null);
    const requestBody = {
      resetToken: resetToken,
      newPassword: newPasswordInput,
    };
    resetPassword(requestBody);
  };

  async function resetPassword(requestBody) {
    try {
      const myData = await postData(URL, requestBody);
      handleClose();
      return true;
    } catch (error) {
      setFormValid("Reset password failed, please check your email address");
      return false;
    }
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (data) => {
    if (data && data.user) {
      const inputData = {
        id: data.user.id,
        name: data.user.name,
        token: data.token,
      };
      navigate("/userhome", { state: inputData });
    } else {
      navigate("/login");
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
              fill="000"
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
              padding: "1rem",
              textAlign: "center",
              color: "white",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Reset Password
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
              gap: 1.5,
              width: 400,
              height: 1,
            }}
          >
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
              label="New Password"
              variant="filled"
              type={showPassword ? "text" : "newpassword"}
              value={newPasswordInput}
              onChange={(event) => setNewPasswordInput(event.target.value)}
              onBlur={handleNewPassword}
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
                },
                "& .MuiFormLabel-root": {
                  fontSize: "18px",
                  fontWeight: "100",
                  lineHeight: "1em",
                },
              }}
              error={passwordError}
              label="Confirm password"
              variant="filled"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onBlur={handleConfirmPassword}
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

            <Typography>
              <Button
                onClick={handleResetPassword}
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
              >
                Submit
              </Button>
            </Typography>

            <Typography component={"div"}>
              {formValid && <Alert severity="error">{formValid}</Alert>}
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
export default ResetPassword;
