import React, { useState, useEffect } from "react";
import {AppBar, Box, Toolbar, IconButton,Typography,Menu, Container,Button,MenuItem, Stack, Avatar, Card,CardContent,CardActions} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import axios from "axios";
import  "./Home.css";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const pages = ["About","Roadmap", "Team", "Faq"];

const Home = () => {
  
  const [ setSocialMedia] = useState({});
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  useEffect(() => {
    axios
      .get("/api/social-media")
      .then((response) => {
        setSocialMedia(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setSocialMedia]);

  return (
    <div>
      <AppBar class="abc" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PetsIcon
              sx={{
                pl: 5,
                color: "#421e89",
                display: { xs: "none", md: "flex" },
              }}
            />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 50,
                display: { sm: "none", md: "flex" },
                fontFamily: " Helvetica Neue",
                letterSpacing: ".3rem",
                color: "#421e89",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              MONSTER
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 5,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box>
              <Stack direction="row" spacing={3}>
                <Avatar sx={{ bgcolor: "#421e89" }}>
                  <RedditIcon />
                </Avatar>
                <Avatar sx={{ bgcolor: "#421e89" }}>
                  <TwitterIcon />
                </Avatar>
                <Avatar sx={{ bgcolor: "#421e89" }}>
                  <InstagramIcon />
                </Avatar>
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <div id="card">
          <Card sx={{ minWidth: 275, bgcolor: "#171821", color: "white" }}>
            <CardContent>
              <Typography variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
                Monster NFT
              </Typography>

              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 1.5, color: "#df8d67" }}
              >
                Collection
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the{" "}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{ bgcolor: "#421e89" }}
                size="small"
              >
                Buy on Opensea
              </Button>
            </CardActions>
          </Card>
        </div>

        <div class="img"></div>
      </Box>
    </div>
  );
};

export default Home;
