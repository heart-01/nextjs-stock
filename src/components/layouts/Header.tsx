import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Box, Menu, MenuItem } from "@mui/material";
import { Mail, Notifications, AccountCircle } from "@mui/icons-material";
import { useAppDispatch } from "@/store/store";
import { signOut } from "@/store/actions/userAction";
import { useRouter } from "next/router";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type HeaderProps = {
  open: boolean;
  onDrawerOpen: () => void;
};

const Header = ({ open, onDrawerOpen }: HeaderProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const handleCloseMenu = () => {
    setShowProfileMenu(false);
  };

  const handleOnClickSignOut = () => {
    dispatch(signOut());
    router.push("/signIn")
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          NextJS Stock
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="account of current user" aria-haspopup="true" color="inherit" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <AccountCircle />
          </IconButton>

          <Menu
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={showProfileMenu}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleOnClickSignOut}>Logout</MenuItem>
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
