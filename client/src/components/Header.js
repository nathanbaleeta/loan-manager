import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ViewListIcon from "@material-ui/icons/ViewList";
import PollIcon from "@material-ui/icons/Poll";
import GroupIcon from "@material-ui/icons/Group";

import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  avatar: {
    height: 55,
    width: 55
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    /* "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.75)
    }, */
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 8,
      width: "auto"
    }
  },

  inputRoot: {
    color: "primary",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: 490
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  customWidth: {
    maxWidth: 500
  }
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //const { isAuthenticated, user } = this.props.auth;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to="/settings" className={classes.link}>
          <MenuItem onClick={this.handleMenuClose}>Settings</MenuItem>
        </Link>

        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <GroupIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>

        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ background: "#2E3B55" }}>
          <Toolbar>
            {/*    <Avatar
              alt="Remy Sharp"
              src="/static/images/logo/7.png"
              className={classes.avatar}
            /> */}
            <Typography
              className={classes.title}
              variant="h4"
              color="inherit"
              noWrap
            >
              Honest Business Services Ltd
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div>
                <Grid container justify="center" alignItems="center">
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/data-analytics" className={classes.link}>
                      <IconButton color="inherit">
                        <PollIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Analytics
                      </Typography>
                    </Link>
                  </div>
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/clients" className={classes.link}>
                      <IconButton color="inherit">
                        <GroupIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Clients
                      </Typography>
                    </Link>
                  </div>
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/expenses" className={classes.link}>
                      <IconButton color="inherit">
                        <ViewListIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Expenses
                      </Typography>
                    </Link>
                  </div>
                </Grid>
              </div>
              {/* 
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <br />
                <ArrowDropDownIcon />
              </IconButton> */}
              <IconButton color="inherit" onClick={this.handleProfileMenuOpen}>
                <AccountCircle style={{ height: 50, width: 50 }} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
