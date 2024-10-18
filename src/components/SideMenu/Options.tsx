import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import NewIcon from "@mui/icons-material/FiberNew";
import ExportImportIcon from "@mui/icons-material/ImportExport";
import UploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import ClearIcon from "@mui/icons-material/ClearAll";
import WarningIcon from "@mui/icons-material/Warning";
import StorageIcon from "@mui/icons-material/Storage";
import Counter from "@mui/icons-material/Filter9Plus";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PaletteIcon from "@mui/icons-material/Palette";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import OpacityIcon from "@mui/icons-material/Opacity";
import { withStyles } from "tss-react/mui";
import { DisplayStyle, Color, Domain } from "../../types";
import { browserName } from "../../popup";
import { CHROME, COLOR_1, HIGHLIGHT, FIREFOX } from "../../constants";
import { isDomainNameOnList } from "../../reducers";
import { Link } from "@mui/material";
import { useColorScheme } from '@mui/material/styles';


const download = (data: string): void => {
  const file = new Blob([data], { type: "application/json" });
  const a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = "hohser-domains.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};

const handleIssue = (): void => {
  window.open("https://github.com/pistom/hohser/issues");
};

const handleJsonStructure = (): void => {
  window.open("https://github.com/pistom/hohser#import-domains-json-structure");
};

const handleWindowMode = (): void => {
  chrome.tabs.create({ url: "/popup.html" });
};

const getExtensionVersion = (): string => {
  let version: string = "";
  try {
    version = "v." + browser.runtime.getManifest().version;
  } catch (e) {}
  return version;
};

const styles = {
  rainbow: {
    backgroundImage: "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)",
    color: "transparent",
    borderRadius: 15,
  },
};

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
  classes?: Partial<Record<keyof typeof styles, string>>;
}

const Options: React.FC<Props> = (props) => {
  const classes = withStyles.getClasses(props);
  const [open, setOpen] = React.useState(false);
  const [openImportDialog, setOpenImportDialog] = React.useState(false);
  const [openColorsDialog, setOpenColorsDialog] = React.useState(false);
  const [domainsListString, setDomainsListString] = React.useState("");
  const [nonDefinedDisplayStyle, setNonDefinedDisplayStyle] =
    React.useState("PARTIAL_HIDE");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [newColor, setNewColor] = React.useState("");
  const [colors, setColors] = React.useState<string[]>([]);
  const [fixColors, setFixColors] = React.useState([
    "f50057",
    "8BC34A",
    "03A9F4",
  ]);
  const [newColorError, setNewColorError] = React.useState(false);

  React.useEffect(() => {
    setColors([...props.options.highlightColors]);
  }, [props.options.highlightColors]);

  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleClick = (): void => {
    setOpen((open) => !open);
  };

  const handleImportMenuItem = (): void => {
    setOpenImportDialog(true);
  };

  const handleColorsMenuItem = (): void => {
    setOpenColorsDialog(true);
  };

  const handleCloseImportDialog = (): void => {
    setOpenImportDialog(false);
  };

  const handleCloseColorsDialog = (): void => {
    setOpenColorsDialog(false);
  };

  const handleChangeDomainListTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDomainsListString(event.target.value);
  };

  const handleExportDomains = (): void => {
    download(JSON.stringify(props.domainsList));
  };

  const handleImportDomains = (): void => {
    const domainsList: Array<Domain> = props.domainsList;
    let newDomainsList: Array<Domain> = [];
    let importedDomainsList: Array<any> = [];
    try {
      importedDomainsList = JSON.parse(domainsListString);
      newDomainsList = importedDomainsList
        .filter(
          (element) => !isDomainNameOnList(element.domainName, domainsList)
        )
        .map(
          (element) =>
            ({
              domainName: element.domainName,
              display: element.display || nonDefinedDisplayStyle,
              color:
                element.display === HIGHLIGHT
                  ? element.color || COLOR_1
                  : undefined,
            } as Domain)
        );
      props.importDomains([...domainsList, ...newDomainsList] as Domain[]);
      setOpenImportDialog(false);
    } catch (e) {
      alert(e.message);
    }
  };

  const readFileContent = (files: any): void => {
    console.log(files);
    if (files.length > 0) {
      const fr = new FileReader();
      fr.onload = (e: any): void => {
        if (e.target) {
          setDomainsListString(e.target.result);
        }
      };
      fr.readAsText(files.item(0));
    } else {
      alert("Select a file");
    }
  };

  const handleChangeNonDefinedDisplayStyle = (
    event: React.ChangeEvent<any>
  ): void => {
    setNonDefinedDisplayStyle(event.target.value);
  };

  const handleClearDomainList = (): void => {
    const clear = confirm("Are you sure?");
    if (clear) {
      props.clearDomainList();
    }
  };

  const handleUseLocalStorageSwithClick = (): void => {
    setOpenSnackbar(true);
    if (browserName === FIREFOX) {
      browser.tabs.query({ active: true, currentWindow: true }).then(() => {
        browser.tabs.reload();
      });
    } else if (browserName === CHROME) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.reload(tabs[0].id as number);
      });
    }
  };

  const handleClickEditColors = (): void => {
    props.updateHighlightCustomColors([...colors]);
    handleCloseColorsDialog();
  };

  const addColor = (): void => {
    if (/^[0-9A-F]{6}$/i.test(newColor) || /^super\d{1,2}$/i.test(newColor)) {
      setColors((colors) => [...colors, newColor]);
      setNewColor("");
      setNewColorError(false);
    } else {
      setNewColorError(true);
    }
  };

  const removeColor = (): void => {
    setColors((colors) => colors.slice(0, -1));
  };

  const handleChangeColor = (event: any): void => {
    setNewColor(event.target.value);
  };

  return (
    <>
      <List component="nav" key="list">
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          {open ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="nav" disablePadding>
              <ListItem>
                  <ListItemText
                    secondary={
                      <FormControl>
                        <FormLabel id="color-scheme-label">Color scheme</FormLabel>
                        <RadioGroup
                          aria-labelledby="color-scheme-label"
                          name="color-scheme-toggle"
                          row
                          value={mode}
                          onChange={(event) =>
                            setMode(event.target.value as 'system' | 'light' | 'dark')
                          }
                        >
                          <FormControlLabel value="system" control={<Radio size="small" />} label="System" />
                          <FormControlLabel value="light" control={<Radio size="small" />} label="Light" />
                          <FormControlLabel value="dark" control={<Radio size="small" />} label="Dark" />
                        </RadioGroup>
                      </FormControl>
                    }
                  />
            </ListItem>
            <ListItemButton onClick={handleColorsMenuItem}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText secondary="Edit custom highlight colors" />
            </ListItemButton>
            <ListItem
              secondaryAction={
                <Switch
                  edge="end"
                  onChange={(): void => props.toggleShowAll()}
                  checked={props.options.showAll}
                />
              }
            >
              <ListItemIcon>
                <PowerOffIcon />
              </ListItemIcon>
              <ListItemText secondary="Show hidden results" />
            </ListItem>
            <ListItem
              secondaryAction={
                <Switch
                  edge="end"
                  onChange={(): void => props.toggleShowCounter()}
                  checked={props.options.showCounter}
                />
              }
            >
              <ListItemIcon>
                <Counter />
              </ListItemIcon>
              <ListItemText secondary="Show hidden results counter" />
            </ListItem>
            <ListItem
              aria-label="Sync storage is limited in size but the local one is not synchronized with your account"
              secondaryAction={
                <Switch
                  edge="end"
                  onChange={props.toggleLocalStorage}
                  checked={props.options.useLocalStorage}
                  onClick={handleUseLocalStorageSwithClick}
                />
              }
            >
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText secondary="Use local storage instead of sync" />
            </ListItem>
            <ListItemButton onClick={handleClearDomainList}>
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              <ListItemText
                secondary={`Clear domain list (${props.domainsList.length})`}
              />
              <WarningIcon fontSize="small" color="error" />
            </ListItemButton>
            <ListItem
              secondaryAction={
                <Switch
                  edge="end"
                  onChange={(): void => props.toggleForceColors()}
                  checked={props.options.forceColors}
                />
              }
            >
              <ListItemIcon>
                <PowerOffIcon />
              </ListItemIcon>
              <ListItemText secondary="Force extension colors" />
            </ListItem>
            <ListItem secondaryAction={null}>
              <ListItemIcon>
                <OpacityIcon />
              </ListItemIcon>
              <ListItemText
                secondary={
                  <>
                    Set partial hide opacity
                    <br />
                    <Slider
                      defaultValue={props.options.partialHideOpacity}
                      onChange={(event, value): void => {
                        props.setPartialHideOpacity(value as number);
                      }}
                      min={0}
                      max={100}
                    />
                  </>
                }
              />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton onClick={handleExportDomains}>
          <ListItemIcon>
            <ExportImportIcon />
          </ListItemIcon>
          <ListItemText primary="Export domain's list" />
          <DownloadIcon fontSize="small" />
        </ListItemButton>
        <ListItemButton onClick={handleImportMenuItem}>
          <ListItemIcon>
            <ExportImportIcon />
          </ListItemIcon>
          <ListItemText primary="Import domain's list" />
          <UploadIcon fontSize="small" />
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={handleIssue}>
          <ListItemIcon>
            <ErrorIcon />
          </ListItemIcon>
          <ListItemText primary="Report an issue" />
          <OpenInNewIcon fontSize="small" />
        </ListItemButton>
        <ListItemButton onClick={handleIssue}>
          <ListItemIcon>
            <NewIcon />
          </ListItemIcon>
          <ListItemText primary="Propose a new feature" />
          <OpenInNewIcon fontSize="small" />
        </ListItemButton>
        <Divider />
        <ListItem>
          <ListItemText secondary={`HoHSer ${getExtensionVersion()}`} />
        </ListItem>
      </List>
      <Dialog
        fullScreen={true}
        key="dialog"
        open={openImportDialog}
        onClose={handleCloseImportDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Import domain's list</DialogTitle>
        <DialogContent>
          <div>
            <DialogContentText style={{ marginBottom: 0 }}>
              Select your JSON file
            </DialogContentText>
            <DialogContentText variant="caption" style={{ marginBottom: 4 }}>
              (It works in{" "}
              <Link href="#" onClick={handleWindowMode} underline="hover">
                window mode
              </Link>{" "}
              only)
            </DialogContentText>
            <DialogContentText variant="caption" style={{ marginBottom: 4 }}>
              <input
                type="file"
                id="file-import"
                onChange={(e): void => readFileContent(e.target.files)}
              />
            </DialogContentText>
          </div>
          <div>
            <DialogContentText style={{ marginBottom: 0 }}>
              or put your JSON formated text belowe
            </DialogContentText>
            <DialogContentText variant="caption" style={{ marginBottom: 10 }}>
              (an example of the JSON data structure{" "}
              <Link href="#" onClick={handleJsonStructure} underline="hover">
                here
              </Link>
              )
            </DialogContentText>
            <TextField
              label="Domain's list"
              multiline
              rows="4"
              value={domainsListString}
              onChange={handleChangeDomainListTextField}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <FormControl
            variant="standard"
            component="span"
            style={{ marginTop: 15 }}
          >
            <FormLabel component="caption">
              Items with no display style defined
            </FormLabel>
            <RadioGroup
              aria-label="Items with no display style defined"
              name="display"
              value={nonDefinedDisplayStyle}
              onChange={handleChangeNonDefinedDisplayStyle}
              row
            >
              <FormControlLabel
                value="PARTIAL_HIDE"
                control={<Radio />}
                label="Transparent"
              />
              <FormControlLabel
                value="FULL_HIDE"
                control={<Radio />}
                label="Hidden"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImportDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImportDomains} color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={openColorsDialog}
        onClose={handleCloseColorsDialog}
      >
        <DialogTitle id="form-dialog-title">Edit hightlight colors</DialogTitle>
        <DialogContent>
          <List dense={true}>
            {fixColors.map((color: string, i: number) => (
              <ListItem>
                <ListItemIcon>
                  <InvertColorsIcon style={{ color: "#" + color }} />
                </ListItemIcon>
                <ListItemText primary={`Color ${i + 1} (${color})`} />
              </ListItem>
            ))}
            <Divider />
            {colors.map((color: string, i: number) => (
              <ListItem
                secondaryAction={
                  colors.length === i + 1 ? (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={removeColor}
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null
                }
              >
                <ListItemIcon>
                  <InvertColorsIcon
                    className={color.includes("super") ? classes.rainbow : ""}
                    style={{
                      color: color.includes("super") ? undefined : "#" + color,
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={`Color ${i + 4} (${color})`} />
              </ListItem>
            ))}
          </List>
          <Paper
            component="form"
            style={{
              padding: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              backgroundColor: newColorError ? "pink" : "transparent",
            }}
          >
            <Tooltip title="Examples: ff0000 for red or 0000ff for blue">
              <InputBase
                placeholder="Hexadecimal color code"
                inputProps={{ "aria-label": "hex format" }}
                onChange={handleChangeColor}
                value={newColor}
                style={{ marginLeft: 12, flex: 1 }}
              />
            </Tooltip>
            <IconButton
              aria-label="add"
              onClick={addColor}
              style={{ padding: 10 }}
              size="large"
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseColorsDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickEditColors} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={
          <span id="message-id">
            Reopen the extension window and reload result pages to apply
            changes.
          </span>
        }
      />
    </>
  );
};

export default withStyles(Options, styles);
