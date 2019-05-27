import * as React from 'react';
import { SwipeableDrawer, withStyles, TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
  toggle: () => void;
  onChangeSearchTextField: (e: any) => void;
  classes: any;
  open: boolean;
  value: string;
}

const styles = (theme: any) => ({
  searchField: {
    marginBottom: 0,
    marginTop: 0,
  }
});

const SearchBox = (props: Props) => {
  const classes = props.classes;
  return (
    <SwipeableDrawer
      anchor="top"
      open={props.open}
      onClose={() => props.toggle()}
      onOpen={() => props.toggle()}
    >
      <TextField
        id="standard-search"
        label="Search"
        type="search"
        className={classes.searchField}
        margin="normal"
        variant="filled"
        value={props.value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                style={{marginRight: -8}}
                aria-label="Search"
                onClick={() => props.toggle()}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={props.onChangeSearchTextField}
      />
    </SwipeableDrawer>
  );
};

export default withStyles(styles)(SearchBox);
