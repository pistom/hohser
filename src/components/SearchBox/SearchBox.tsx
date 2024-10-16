import * as React from 'react';
import { withStyles } from 'tss-react/mui';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

const styles = {
  searchField: {
    marginBottom: 0,
    marginTop: 0,
  }
};

interface Props {
  toggle: () => void;
  onChangeSearchTextField: (e: any) => void;
  classes?: Partial<Record<keyof typeof styles, string>>;
  open: boolean;
  value: string;
}

const SearchBox = (props: Props) => {
  const classes = withStyles.getClasses(props);
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
        <FormControl variant="standard" fullWidth>
          <TextField
            autoFocus
            id="standard-search"
            label="Search"
            type="search"
            className={classes.searchField}
            margin="normal"
            variant="filled"
            value={props.value}
            onChange={props.onChangeSearchTextField}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{marginRight: -8}}
                      aria-label="Search"
                      onClick={() => props.toggle()}
                      size="large">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
        </FormControl>
      </form>
    </SwipeableDrawer>
  );
};

export default withStyles(SearchBox, styles);
