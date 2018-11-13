import * as React from 'react';
import { Toolbar, AppBar, withStyles, Grid, FormControl, TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
    top: 'auto',
    bottom: 0,
  },
};

class BottomBar extends React.Component<Props> {

  constructor (props: Props) {
    super(props);
  }

  render () {
    const classes = this.props.classes;
    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar style={{paddingBottom: '10px'}}>
          <form className={classes.root} autoComplete="off">
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Domain"
                    id="margin-none"
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3} sm={2}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Style</InputLabel>
                  <Select
                    // value={this.state.age}
                    // onChange={this.handleChange}
                    inputProps={{
                      name: 'Style',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} sm={2}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Color</InputLabel>
                  <Select
                    // value={this.state.age}
                    // onChange={this.handleChange}
                    inputProps={{
                      name: 'Color',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl margin="dense" fullWidth className={classes.formControl}>
                  <Button variant="raised" size="small" color="secondary" className={classes.button}>
                    Add <AddIcon />
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>

        </Toolbar>

      </AppBar>
    );
  }
}

export default withStyles(styles)(BottomBar);
