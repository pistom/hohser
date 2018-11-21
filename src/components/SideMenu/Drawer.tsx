import * as React from 'react';
import { SwipeableDrawer, withStyles } from '@material-ui/core';
import Options from './Options';

interface Props {
  toggle: () => void;
  toggleShowAll: () => void;
  classes: any;
  open: boolean;
  options: any;
}

const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 240,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
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
        className={classes.root}
        tabIndex={0}
        role="button"
      >
        <Options
          options={props.options}
          toggleShowAll={() => props.toggleShowAll()}
        />
      </div>
    </SwipeableDrawer>
  );
};

export default withStyles(styles)(Drawer);
