import { Domain, DisplayStyle } from 'src/types';
import * as React from 'react';
import AddDomain from '../AddDomain/AddDomain';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, withStyles, CssBaseline, TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import TopBar from '../TopBar/TopBar';

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
  appBarBottom: {
    top: 'auto',
    bottom: 0,
  },
  appBarTop: {
    bottom: 'auto',
    top: 0,
  },
};



export interface Props {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  addDomain: (domainName: string, display: DisplayStyle) => void;
  removeDomain: (index: number) => void;
  fetchDomainsList: () => void;
  importFromOldVersion: () => void;
  classes: any;
}

class App extends React.Component<Props> {
  constructor (props: Props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchDomainsList();
  }

  componentWillUpdate (nextProps: Props) {
    if (this.props.domainsListLoading && !nextProps.domainsListLoading) {
      this.props.importFromOldVersion();
    }
  }

  removeDomainHandle (index: number) {
    this.props.removeDomain(index);
  }

  public render () {
    const { classes } = this.props;
    return [
      <CssBaseline />,
      <TopBar />,
      <AddDomain addDomain={this.props.addDomain} />,
      <div style={{paddingTop: 48}}>
        {Object.keys(this.props.domainsList).map((item, i) => (
          <li key={i}>
            {this.props.domainsList[item].domainName} -
            {this.props.domainsList[item].display ? <span>{this.props.domainsList[item].display}</span> : null} -
            {this.props.domainsList[item].color ? <span>{this.props.domainsList[item].color}</span> : null} -
            <span onClick={() => this.removeDomainHandle(i)}>❌</span>
          </li>
        ))
        }
      </div>,
      <AppBar position="fixed" color="default" className={classes.appBarBottom}>
        <Toolbar>
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
              <Grid item xs={2}>
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
              <Grid item xs={2}>
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
              <Grid item xs>
                <FormControl margin="dense" fullWidth className={classes.formControl}>
                  <div style={{textAlign: 'right'}}>
                    <Button variant="fab" mini color="secondary" aria-label="Add" className={classes.button}>
                      <AddIcon />
                    </Button>
                  </div>
                </FormControl>
              </Grid>
            </Grid>
          </form>

        </Toolbar>

      </AppBar>
    ];
  }
}

export default withStyles(styles)(App);
