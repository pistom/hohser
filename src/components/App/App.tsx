import { Domain, DisplayStyle } from 'src/types';
import * as React from 'react';
import AddDomain from '../AddDomain/AddDomain';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography, withStyles, CssBaseline } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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

  componentWillUpdate (nextProps: Props){
    if (this.props.domainsListLoading && !nextProps.domainsListLoading) {
      this.props.importFromOldVersion();
    }
  }

  removeDomainHandle (index: number) {
    this.props.removeDomain(index);
  }

  public render () {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <CssBaseline />
        <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Highlight or Hide
          </Typography>
        </Toolbar>
      </AppBar>
        <AddDomain addDomain={this.props.addDomain} />
        {Object.keys(this.props.domainsList).map((item, i) => (
          <li key={i}>
            {this.props.domainsList[item].domainName} -
            {this.props.domainsList[item].display ? <span>{this.props.domainsList[item].display}</span> : null} -
            {this.props.domainsList[item].color ? <span>{this.props.domainsList[item].color}</span> : null} -
            <span onClick={() => this.removeDomainHandle(i)}>❌</span>
          </li>
        ))}
    </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
