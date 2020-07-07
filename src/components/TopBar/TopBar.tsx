import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  toggleDrawer: () => void;
  toggleSearch: () => void;
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
  searchButton: {
    marginRight: -12,
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
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => props.toggleDrawer()} >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow} >
          Highlight or Hide
        </Typography>
        <IconButton className={classes.searchButton} color="inherit" aria-label="Search" onClick={() => props.toggleSearch()} >
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopBar);
