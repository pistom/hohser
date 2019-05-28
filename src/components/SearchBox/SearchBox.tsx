import * as React from 'react';
import { SwipeableDrawer, withStyles, TextField, InputAdornment, IconButton, FormControl } from '@material-ui/core';
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
  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.toggle();
  };
  return (
    <SwipeableDrawer
      anchor="top"
      open={props.open}
      onClose={() => props.toggle()}
      onOpen={() => props.toggle()}
    >
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            autoFocus
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
        </FormControl>
      </form>
    </SwipeableDrawer>
  );
};

export default withStyles(styles)(SearchBox);
