import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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
    //width: "100%",
    //maxWidth: 427,
    maxWidth: "24%",
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    overflow: "auto",
    maxHeight: "100%",
    borderRight: "1px solid #d4d4d4",
    paddingLeft: "1%"
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  message: {
    borderTop: "1px solid #d4d4d4"
    /* "&:hover": {
      background: "#D23E56",
      color: "white"
    } */
  },
  fab: {
    marginLeft: "7%",
    marginBottom: "2%"
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
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>

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
      </List>
    </React.Fragment>
  );
}

LoanList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoanList);
