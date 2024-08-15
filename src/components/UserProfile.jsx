import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Snackbar, TextField, InputAdornment, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      const id = localStorage.getItem("id");

      if (!token || !id) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5555/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            username: data.username || "",
            email: data.email || "",
            contactNumber: data.phone || "",
            password: "",
          });
          setAvatar(data.avatar || null);
        } else {
          const errorResult = await response.json();
          setMessage(errorResult.error || "Failed to fetch user data.");
        }
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const id = localStorage.getItem("id");

    try {
      const response = await fetch(`http://localhost:5555/users/${id}`, {
        method: "PATCH", // Using PATCH instead of PUT
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, avatar }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setMessage("Profile updated successfully!");
      console.log("Profile updated successfully:", data);
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const handleSnackbarClose = () => setMessage("");

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", background: "linear-gradient(to right, #74ebd5, #ACB6E5)" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Box
          sx={{
            padding: 4,
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <IconButton onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
            <ArrowBackIcon style={{ color: "#007BFF" }} />
          </IconButton>
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold", color: "#007BFF" }}>
            User Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={
                  avatar ||
                  "https://cdn.builder.io/api/v1/image/assets/TEMP/abbf950f2a8a007869429c7e9fd0e822f1523d6d3ea027e64766fd65baab6430?placeholderIfAbsent=true&apiKey=d975cdd6201143ddb3c9da5092c113ba"
                }
                alt="User profile"
                style={{ borderRadius: "50%", marginBottom: "1rem", width: "120px", height: "120px" }}
              />
              <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
                Upload Picture
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: 2,
                  padding: 1.5,
                  backgroundColor: "#007BFF",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                Save Changes
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  marginTop: 3,
                  padding: 1.5,
                  backgroundColor: "#D32F2F",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#B71C1C",
                  },
                }}
              >
                Log Out
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box
          sx={{
            bgcolor: "green",  
            color: "white",
            p: 2,
            borderRadius: "4px",
          }}
        >
          <Typography variant="body1" align="center">
            {message}
          </Typography>
        </Box>
      </Snackbar>
    </Grid>
  );
};

export default UserProfile;
