import * as React from 'react';
import { SwipeableDrawer, withStyles, Toolbar, IconButton } from '@material-ui/core';
import Options from './Options';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { DisplayStyle, Color, Domain } from '../../types';

interface Props {
  toggle: () => void;
  toggleShowAll: () => void;
  toggleLocalStorage: () => void;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  clearDomainList: () => void;
  importDomains: (domainsList: Domain[]) => void;
  classes: any;
  open: boolean;
  options: any;
  domainsList: Array<Domain>;
}

const styles = (theme: any) => ({
  root: {
    width: 300,
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const Drawer = (props: Props) => {
  const classes = props.classes;
  return (
    <SwipeableDrawer
      open={props.open}
      onClose={() => props.toggle()}
      onOpen={() => props.toggle()}
    >
      <div
        tabIndex={0}
        role="button"
        className={classes.root}
      >
        <Toolbar>
          <IconButton className={classes.menuButton} onClick={() => props.toggle()} >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
        <Options
          options={props.options}
          toggleShowAll={() => props.toggleShowAll()}
          toggleLocalStorage={props.toggleLocalStorage}
          addDomain={props.addDomain}
          domainsList={props.domainsList}
          clearDomainList={props.clearDomainList}
          importDomains={props.importDomains}
        />
      </div>
    </SwipeableDrawer>
  );
};

export default withStyles(styles)(Drawer);
