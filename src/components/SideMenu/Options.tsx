import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
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
import Counter from '@material-ui/icons/Filter9Plus';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PaletteIcon from '@material-ui/icons/Palette';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { withStyles } from '@material-ui/core/styles';
import { DisplayStyle, Color, Domain } from '../../types';
import { browserName } from '../../popup';
import { CHROME, COLOR_1, HIGHLIGHT, FIREFOX } from '../../constants';
import { isDomainNameOnList } from '../../reducers';
import { Link } from '@material-ui/core';

interface Props {
  options: any;
  toggleShowAll: () => void;
  toggleForceColors: () => void;
  setPartialHideOpacity: (opacity: number) => void;
  toggleShowCounter: () => void;
  toggleLocalStorage: () => void;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  clearDomainList: () => void;
  importDomains: (domainsList: Domain[]) => void;
  updateHighlightCustomColors: (colors: string[]) => void;
  domainsList: Array<Domain>;
  classes: any;
}

interface State {
  open: boolean;
  openImportDialog: boolean;
  openColorsDialog: boolean;
  domainsListString: string;
  nonDefinedDisplayStyle: string;
  openSnackbar: boolean;
  newColor: string;
  colors: string[];
  fixColors: string[];
  newColorError: boolean;
}

const styles = (theme: any) => ({
  rainbow: {
    backgroundImage: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    color: 'transparent',
    borderRadius: 15
  },
});

class Options extends React.Component<Props, State> {
  state = {
    open: false,
    openImportDialog: false,
    openColorsDialog: false,
    domainsListString: '',
    nonDefinedDisplayStyle: "PARTIAL_HIDE",
    openSnackbar: false,
    newColor: '',
    colors: [],
    fixColors:['f50057','8BC34A','03A9F4'],
    newColorError: false
  };

  constructor (props: Props) {
    super(props);
    this.handleUseLocalStorageSwithClick = this.handleUseLocalStorageSwithClick.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  componentDidMount (): void {
    this.setState({colors: [...this.props.options.highlightColors]});
  }

  handleClick = (): void => {
    this.setState(state => ({ open: !state.open }));
  }

  handleIssue = (): void => {
    window.open("https://github.com/pistom/hohser/issues");
  }

  handleImportMenuItem = (): void => {
    this.setState({ openImportDialog: true });
  }

  handleColorsMenuItem = (): void => {
    this.setState({ openColorsDialog: true });
  }

  handleJsonStructure = (): void => {
    window.open("https://github.com/pistom/hohser#import-domains-json-structure");
  }

  handleWindowMode = (): void => {
    chrome.tabs.create({'url': "/popup.html" });
  }

  getExtensionVersion = (): string => {
    let version: string = "";
    try {
      version = "v." + browser.runtime.getManifest().version;
    } catch (e) { }
    return version;
  }

  handleCloseImportDialog = (): void => {
    this.setState({ openImportDialog: false });
  }

  handleCloseColorsDialog = (): void => {
    this.setState({ openColorsDialog: false });
  }

  handleChangeDomainListTextField = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ domainsListString: event.target.value });
  }

  handleExportDomains = (): void => {
    this.download(JSON.stringify(this.props.domainsList));
  }

  handleImportDomains = (): void => {
    const domainsList: Array<Domain> = this.props.domainsList;
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

  readFileContent = (files: any): void => {
    console.log(files);
    if (files.length > 0) {
      const fr = new FileReader();
      fr.onload = (e: any): void => {
        if (e.target) {
          this.setState({ domainsListString: e.target.result });
        }
      };
      fr.readAsText(files.item(0));
    } else {
      alert('Select a file');
    }
  }

  download = (data: string): void => {
    const file = new Blob([data], { type: 'application/json' });
    const a = document.createElement("a"),
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

  handleChangeNonDefinedDisplayStyle = (event: React.ChangeEvent<any>): void => {
    this.setState({ nonDefinedDisplayStyle: event.target.value });
  }

  handleClearDomainList = (): void => {
    const clear = confirm("Are you sure?");
    if(clear){
      this.props.clearDomainList();
    }
  }

  public handleUseLocalStorageSwithClick = (): void => {
    this.setState({openSnackbar: true});
    if (browserName === FIREFOX) {
      browser.tabs.query({active: true, currentWindow: true}).then(() => {
        browser.tabs.reload();
      });
    } else if (browserName === CHROME) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.reload(tabs[0].id as number);
    });
    }
  }

  public handleClickEditColors = (): void => {
    this.props.updateHighlightCustomColors([...this.state.colors]);
    this.handleCloseColorsDialog();
  }

  public addColor = (): void => {
    if (/^[0-9A-F]{6}$/i.test(this.state.newColor) || /^super\d{1,2}$/i.test(this.state.newColor) ) {
      const colors: string[] = [...this.state.colors];
      colors.push(this.state.newColor);
      this.setState({colors, newColor: '', newColorError: false});
    } else {
      this.setState({newColorError: true});
    }
  }

  public removeColor = (): void => {
    const colors: string[] = [...this.state.colors];
    colors.splice(-1,1);
    this.setState({colors});
  }

  public handleChangeColor = (event: any): void => {
    this.setState({newColor: event.target.value});
  }

  render (): JSX.Element[] {
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
            <ListItem button onClick={this.handleColorsMenuItem}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText secondary="Edit custom highlight colors" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PowerOffIcon />
              </ListItemIcon>
              <ListItemText secondary="Show hidden results" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={(): void => this.props.toggleShowAll()}
                  checked={this.props.options.showAll}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Counter />
              </ListItemIcon>
              <ListItemText secondary="Show hidden results counter" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={(): void => this.props.toggleShowCounter()}
                  checked={this.props.options.showCounter}
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
                  onClick={this.handleUseLocalStorageSwithClick}
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
            <ListItem>
              <ListItemIcon>
                <PowerOffIcon />
              </ListItemIcon>
              <ListItemText secondary="Force extension colors" />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={(): void => this.props.toggleForceColors()}
                  checked={this.props.options.forceColors}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PowerOffIcon />
              </ListItemIcon>
              <ListItemText 
                secondary={
                  <>
                    Set partial hide opacity<br />
                    <Slider
                      defaultValue={this.props.options.partialHideOpacity}
                      onChange={(event, value): void => {
                        this.props.setPartialHideOpacity(value as number);
                      }}
                      min={0}
                      max={100}
                    />
                  </>
                }
              />
              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
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
        <DialogTitle id="form-dialog-title">Import domain's list</DialogTitle>
        <DialogContent>
            <div>
              <DialogContentText style={{ marginBottom: 0 }}>
                Select your JSON file
              </DialogContentText>
              <DialogContentText variant="caption" style={{ marginBottom: 4 }}>
                (It works in <Link href="#" onClick={this.handleWindowMode}>window mode</Link> only)
              </DialogContentText>
              <DialogContentText variant="caption" style={{ marginBottom: 4 }}>
                <input type="file" id="file-import" onChange={(e): void => this.readFileContent(e.target.files)} />
              </DialogContentText>
            </div> 
            <div>
              <DialogContentText style={{ marginBottom: 0 }}>
                or put your JSON formated text belowe
              </DialogContentText>
              <DialogContentText variant="caption" style={{ marginBottom: 10 }}>
                (an example of the JSON data structure <Link href="#" onClick={this.handleJsonStructure}>here</Link>)
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
      </Dialog>,
      <Dialog
        fullScreen
        open={this.state.openColorsDialog}
        onClose={this.handleCloseColorsDialog}>
        <DialogTitle id="form-dialog-title">Edit hightlight colors</DialogTitle>
        <DialogContent>
        <List dense={true}>
          { this.state.fixColors.map((color: string, i: number) => (
            <ListItem>
              <ListItemIcon>
                <InvertColorsIcon style={{ color: '#'+color }} />
              </ListItemIcon>
              <ListItemText primary={ `Color ${i+1} (${color})` } />
            </ListItem>
          ))}
          <Divider />
          { this.state.colors.map((color: string, i: number) => (
            <ListItem>
              <ListItemIcon>
              <InvertColorsIcon
                  className={ color.includes('super') ? this.props.classes.rainbow : '' }
                  style={{ color: color.includes('super') ? undefined : '#'+color }} />
              </ListItemIcon>
              <ListItemText primary={ `Color ${i+4} (${color})` } />
              { this.state.colors.length === i + 1 ?
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={this.removeColor}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction> : null
              }
            </ListItem>
          ))}
          </List>
          <Paper
            component="form"
            style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: this.state.newColorError ? 'pink' : 'transparent'}}
          >
            <Tooltip title="Examples: ff0000 for red or 0000ff for blue">
              <InputBase
                placeholder="Hexadecimal color code"
                inputProps={{ 'aria-label': 'hex format' }}
                onChange={this.handleChangeColor}
                value={this.state.newColor}
                style={{marginLeft: 12, flex: 1}}
              />
            </Tooltip>
            <IconButton aria-label="add" onClick={this.addColor} style={{padding: 10}}>
              <AddIcon />
            </IconButton>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseColorsDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClickEditColors} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>,
      <Snackbar
        open={this.state.openSnackbar}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Reopen the extension window and reload result pages to apply changes.</span>}
      />
    ];
  }
}

export default withStyles(styles)(Options);

