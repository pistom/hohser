import * as React from 'react';
import { List, ListItem, ListItemIcon, Collapse, ListItemText, ListItemSecondaryAction, Switch, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from '@material-ui/core';
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
import ClearIcon from '@material-ui/icons/ClearAll';
import WarningIcon from '@material-ui/icons/Warning';
import StorageIcon from '@material-ui/icons/Storage';
import { DisplayStyle, Color, Domain } from 'src/types';
import { browserName } from 'src/popup';
import { CHROME, COLOR_1, HIGHLIGHT } from 'src/constants';
import { isDomainNameOnList } from 'src/reducers';

interface Props {
  options: any;
  toggleShowAll: () => void;
  toggleLocalStorage: () => void;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  clearDomainList: () => void;
  importDomains: (domainsList: Domain[]) => void;
  domainsList: Array<Domain>;
}

interface State {
  open: boolean;
  openImportDialog: boolean;
  domainsListString: string;
  nonDefinedDisplayStyle: string;
}

class Options extends React.Component<Props, State> {
  state = {
    open: false,
    openImportDialog: false,
    domainsListString: '',
    nonDefinedDisplayStyle: "PARTIAL_HIDE"
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  handleIssue = () => {
    window.open("https://github.com/pistom/hohser/issues");
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
    } catch (e) { }
    return version;
  }

  handleCloseImportDialog = () => {
    this.setState({ openImportDialog: false });
  }

  handleChangeDomainListTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ domainsListString: event.target.value });
  }

  handleExportDomains = () => {
    this.download(JSON.stringify(this.props.domainsList));
  }

  handleImportDomains = () => {
    let domainsList: Array<Domain> = this.props.domainsList;
    let newDomainsList: Array<Domain> = [];
    let importedDomainsList: Array<any> = [];
    try {
      importedDomainsList = JSON.parse(this.state.domainsListString);
      newDomainsList = importedDomainsList
      .filter(element => !isDomainNameOnList(element.domainName, domainsList))
      .map(element => ({
        domainName: element.domainName,
        display: element.display || this.state.nonDefinedDisplayStyle,
        color: element.display === HIGHLIGHT ? element.color || COLOR_1 : undefined
      } as Domain));
      this.props.importDomains([...domainsList, ...newDomainsList] as Domain[]);
      this.setState({ openImportDialog: false });
    } catch (e) {
      alert(e.message);
    }
  }

  readFileContent = (files: any) => {
    console.log(files);
    if (files.length > 0) {
      const fr = new FileReader();
      fr.onload = (e: any) => {
        if (e.target) {
          this.setState({ domainsListString: e.target.result });
        }
      };
      fr.readAsText(files.item(0));
    } else {
      alert('Select a file');
    }
  }

  download = (data: string) => {
    var file = new Blob([data], { type: 'application/json' });
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'hohser-domains.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  handleChangeNonDefinedDisplayStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ nonDefinedDisplayStyle: event.target.value });
  }

  handleClearDomainList = () => {
    const clear = confirm("Are you sure?");
    if(clear){
      this.props.clearDomainList();
    }
  }

  render () {
    return [
      <List component="nav" key="list">
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
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
                  edge="end"
                  onChange={() => this.props.toggleShowAll()}
                  checked={this.props.options.showAll}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem aria-label="Sync storage is limited in size but the local one is not synchronized with your account">
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText secondary="Use local storage instead of sync" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={this.props.toggleLocalStorage}
                  checked={this.props.options.useLocalStorage}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem button onClick={this.handleClearDomainList}>
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              <ListItemText secondary={`Clear domain list (${this.props.domainsList.length})`} />
              <WarningIcon fontSize="small" color="error" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={this.handleExportDomains}>
          <ListItemIcon>
            <ExportImportIcon />
          </ListItemIcon>
          <ListItemText primary="Export domain's list" />
          <DownloadIcon fontSize="small" />
        </ListItem>
        <ListItem button onClick={this.handleImportMenuItem}>
          <ListItemIcon>
            <ExportImportIcon />
          </ListItemIcon>
          <ListItemText primary="Import domain's list" />
          <UploadIcon fontSize="small" />
        </ListItem>
        <Divider />
        <ListItem button onClick={this.handleIssue}>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText primary="Report an issue" />
          <OpenInNewIcon fontSize="small" />
        </ListItem>
        <ListItem button onClick={this.handleIssue}>
          <ListItemIcon>
            <NewIcon />
          </ListItemIcon>
          <ListItemText primary="Propose a new feature" />
          <OpenInNewIcon fontSize="small" />
        </ListItem>
        <ListItem button onClick={this.handleGift}>
          <ListItemIcon>
            <CafeIcon />
          </ListItemIcon>
          <ListItemText primary="Offer a cup of coffee" />
          <OpenInNewIcon fontSize="small" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText secondary={`HoHSer ${this.getExtensionVersion()}`} />
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
          {browserName === CHROME ?
            <div>
              <DialogContentText>
                Select your JSON file
              </DialogContentText>
              <input type="file" id="file-import" onChange={(e) => this.readFileContent(e.target.files)} />
            </div> :
            <div>
              <DialogContentText>
                Copy your JSON formated text
              </DialogContentText>
              <DialogContentText variant="caption" style={{ marginBottom: 10 }}>
                For some reason Firefox doesn't support correctly file import for extension's popup.
                You must copy plaintext from your json file and paste it in the text area.
                Follow the bug <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1292701">here</a>.
              </DialogContentText>
              <TextField
                label="Domain's list"
                multiline
                rows="4"
                value={this.state.domainsListString}
                onChange={this.handleChangeDomainListTextField}
                variant="outlined"
                style={{ width: "100%" }}
              />
            </div>
          }
          <FormControl component="span" style={{ marginTop: 15 }}>
            <FormLabel component="caption">
              Items with no display style defined
            </FormLabel>
            <RadioGroup
              aria-label="Items with no display style defined"
              name="display"
              value={this.state.nonDefinedDisplayStyle}
              onChange={this.handleChangeNonDefinedDisplayStyle}
              row
            >
              <FormControlLabel value="PARTIAL_HIDE" control={<Radio />} label="Transparent" />
              <FormControlLabel value="FULL_HIDE" control={<Radio />} label="Hidden" />
            </RadioGroup>
          </FormControl>
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

