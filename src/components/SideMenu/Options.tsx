import * as React from 'react';
import { List, ListItem, ListItemIcon, Collapse, ListItemText, ListItemSecondaryAction, Switch, Divider } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PowerOffIcon from '@material-ui/icons/PowerOff';

interface Props {
  options: any;
  toggleShowAll: () => void;
}

interface State {
  open: boolean;
}

class Options extends React.Component<Props, State> {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  render () {
    return (
      <List component="nav">
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <ListItemIcon>
                <PowerOffIcon />
              </ListItemIcon>
              <ListItemText secondary="Disable modifications" />
              <ListItemSecondaryAction>
                <Switch
                  onChange={() => this.props.toggleShowAll()}
                  checked={this.props.options.showAll}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Collapse>
        <Divider light />
      </List>
    );
  }
}

export default (Options);

