import * as React from 'react';
import { List, ListItem, ListItemIcon, Collapse, ListItemText, ListItemSecondaryAction, Switch, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import NewIcon from '@material-ui/icons/FiberNew';
import CafeIcon from '@material-ui/icons/LocalCafeOutlined';
import ExportImportIcon from '@material-ui/icons/ImportExport';
import UploadIcon from '@material-ui/icons/CloudUpload';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { DisplayStyle, Color } from 'src/types';
import { browserName } from 'src/popup';
import { CHROME } from 'src/constants';

interface Props {
  options: any;
  toggleShowAll: () => void;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
}

interface State {
  open: boolean;
  openImportDialog: boolean;
  domainsListString: string;
}

class Options extends React.Component<Props, State> {
  state = {
    open: false,
    openImportDialog: false,
    domainsListString: ''
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  handleIssue = () => {
    window.open("https://github.com/pistom/hohser/issues");
  }

  handleExport = () => {
    window.alert('Export');
  }

  handleImportMenuItem = () => {
    this.setState({ openImportDialog: true });
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

  handleCloseImportDialog = () => {
    this.setState({ openImportDialog: false });
  }

  handleChangeDomainListTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({domainsListString: event.target.value});
  }

  handleImportDomains = () => {
    alert('Imported');
    // this.props.addDomain(this.state.domainName, display);
  }

  render () {
    return [
      <List component="nav" key="list">
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
        <ListItem button onClick={this.handleExport}>
          <ListItemIcon>
            <ExportImportIcon />
          </ListItemIcon>
          <ListItemText inset primary="Export domain's list" />
          <DownloadIcon fontSize="small" />
        </ListItem>
        <ListItem button onClick={this.handleImportMenuItem}>
          <ListItemIcon>
            <ExportImportIcon />
          </ListItemIcon>
          <ListItemText inset primary="Import domain's list" />
          <UploadIcon fontSize="small" />
        </ListItem>
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
      </List>,
      <Dialog
        fullScreen={true}
        key="dialog"
        open={this.state.openImportDialog}
        onClose={this.handleCloseImportDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Import domain's list from file</DialogTitle>
        <DialogContent>
          { browserName === CHROME ?
            <div>
              <DialogContentText>
                Select your JSON file
              </DialogContentText>
              <input type="file" />
            </div> :
            <div>
              <DialogContentText>
                Copy your JSON formated text
              </DialogContentText>
              <DialogContentText variant="caption">
                For some reason Firefox doesn't support correctly file imports for extensions popup.
                You must copy plaintext from your json file and paste it in the text area.
                Follow the bug <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1292701">here</a>.
              </DialogContentText>
              <TextField
                id="filled-multiline-flexible"
                label="Domain's list"
                multiline
                rows="8"
                value={this.state.domainsListString}
                onChange={this.handleChangeDomainListTextField}
                margin="normal"
                variant="outlined"
                style={{width: "100%"}}
              />
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseImportDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleImportDomains} color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>
    ];
  }
}

export default (Options);

