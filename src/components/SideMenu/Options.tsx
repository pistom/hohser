import * as React from 'react';
import { withStyles, List, ListItem, ListItemIcon, ListSubheader, Collapse, ListItemText } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

interface Props {
  classes: any;
  options: any;
  toggleShowAll: () => void;
}

interface State {
  open: boolean;
}

const styles = (theme: any) => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});


class Options extends React.Component<Props, State> {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  render () {
    const { classes } = this.props;
    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Options</ListSubheader>}
      >
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={() => this.props.toggleShowAll()}>
              <ListItemIcon>
                {this.props.options.showAll ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

export default withStyles(styles)(Options);

