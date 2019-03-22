import * as React from 'react';
import { List, ListItem, ListItemIcon, Collapse, ListItemText, ListItemSecondaryAction, Switch, Divider } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import NewIcon from '@material-ui/icons/FiberNew';
import CafeIcon from '@material-ui/icons/LocalCafeOutlined';

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

  handleIssue = () => {
    window.open("https://github.com/pistom/hohser/issues");
  }

  handleGift = () => {
    window.open("https://paypal.me/pools/c/89TvfGqSHW");
  }

  getExtensionVersion = () => {
    let version: string = "";
    try {
       version = "v." + browser.runtime.getManifest().version;
    } catch (e) {}
    return version;
  }

  render () {
    return (
      <List component="nav">
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Settings" />
          {this.state.open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="nav" disablePadding>
            <ListItem>
              <ListItemIcon>
                <PowerOffIcon />
              </ListItemIcon>
              <ListItemText secondary="Show hidden results" />
              <ListItemSecondaryAction>
                <Switch
                  onChange={() => this.props.toggleShowAll()}
                  checked={this.props.options.showAll}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={this.handleIssue}>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText inset primary="Report an issue" />
          <OpenInNewIcon fontSize="small" />
        </ListItem>
        <ListItem button onClick={this.handleIssue}>
          <ListItemIcon>
            <NewIcon />
          </ListItemIcon>
          <ListItemText inset primary="Propose a new feature" />
          <OpenInNewIcon fontSize="small" />
        </ListItem>
        <ListItem button onClick={this.handleGift}>
          <ListItemIcon>
            <CafeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Offer a cup of coffee" />
          <OpenInNewIcon fontSize="small" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText inset secondary={`HoHSer ${this.getExtensionVersion()}`} />
        </ListItem>
      </List>
    );
  }
}

export default (Options);

