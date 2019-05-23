import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  //Style the scrollbar
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em"
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.3)",
      outline: "1px solid slategrey"
    }
  },
  root: {
    width: "100%",
    //maxWidth: 470,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 800
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  message: {
    borderBottom: "1px solid #d4d4d4"
    /* "&:hover": {
      background: "#D23E56",
      color: "white"
    } */
  },

  // Overiding CSS with classnames for ListItemText Implementation
  primary: {
    fontSize: "20px",
    fontWeight: "bold"
  },
  secondary: {
    fontSize: "18px"
  }
});

function LoanList(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Typography
        variant="display1"
        gutterBottom
        align="center"
        color="primary"
      >
        Loan List
      </Typography>
      <List className={classes.root}>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem button className={classes.message}>
          <ListItemText
            classes={{
              primary: classes.primary,
              secondary: classes.secondary
            }}
            primary="Nathan Baleeta"
            secondary={
              <React.Fragment>
                {"  I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
}

LoanList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoanList);
