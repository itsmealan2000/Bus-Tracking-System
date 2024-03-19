import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { getProfileApi } from '../../../SERVICES/AllAPI';
import { useEffect } from 'react';
import { useState } from 'react';



const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
    
  const navigate=useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut=()=>{
    localStorage.removeItem("token")
    navigate('/admin-auth')
}

const [profile, setProfile] = useState(null);



const token = localStorage.getItem("token");

const getProfile = async () => {
  const header = {
    Authorization: `Token ${token}`,
  };
  const response = await getProfileApi(header);
  console.log(response.data);
  setProfile(response.data);
};

useEffect(() => {
  getProfile();
}, []); 

  


  return (
    <div>
         <AppBar position="static" className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img className='logo ' src="https://i.postimg.cc/8z0KPDs6/13a15b0b31789ed21fc556c11f01cd04-removebg-preview.png" alt="" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "White",
                textDecoration: "none",
              }}
            >
              TRANSITEASE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="Black"
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
                <MenuItem>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>

                <MenuItem>
                  <Typography textAlign="center">Find Bus</Typography>
                </MenuItem>
               
                <MenuItem>
                  <Typography textAlign="center"><a href='#about'>About</a></Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>

              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TRANSITEASE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
             
                <MenuItem>
                <Link to={'/home'}>  <Typography textAlign="center" className='text-white'>Home</Typography></Link>
                </MenuItem>
            
                <MenuItem>
                 <Link to={'/find-bus'}> <Typography textAlign="center" className='text-white'>Find Bus</Typography></Link>
                </MenuItem>
            
                <MenuItem>
                  <Typography textAlign="center" className='' ><a className='text-white' href='#about'>About</a></Typography>
                </MenuItem>
            
                <MenuItem>
                  <Typography textAlign="center"><a className='text-white' href='#footer'>Contact</a></Typography>
                </MenuItem>
              
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={profile&&profile.username} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                   <MenuItem>
                  <Typography textAlign="center"><Link to={"/profile"}>Profile</Link></Typography>
                </MenuItem>
                <MenuItem >
                  <Typography onClick={handleLogOut} textAlign="center">Logout</Typography>
                </MenuItem>

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header

