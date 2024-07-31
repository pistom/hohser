import * as React from 'react';
import withStyles from '@mui/styles/withStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={() => props.toggleDrawer()}
          size="large">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow} >
          Highlight or Hide
        </Typography>
        <IconButton
          className={classes.searchButton}
          color="inherit"
          aria-label="Search"
          onClick={() => props.toggleSearch()}
          size="large">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TopBar);
