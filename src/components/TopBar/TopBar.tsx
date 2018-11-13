import * as React from 'react';
import { Toolbar, IconButton, Typography, AppBar, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
  classes: any;
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    bottom: 'auto',
    top: 0,
  },
};

const TopBar = (props: Props) => {
  const classes = props.classes;
  return(
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Highlight or Hide
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopBar);
