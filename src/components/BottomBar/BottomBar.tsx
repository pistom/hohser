import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { withStyles } from 'tss-react/mui';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import ColorIcon from '@mui/icons-material/InvertColors';
import NoColorIcon from '@mui/icons-material/InvertColorsOff';
import AddIcon from '@mui/icons-material/Add';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { DisplayStyle, Color } from '../../types';
import { HIGHLIGHT, FULL_HIDE, PARTIAL_HIDE, COLOR_1 } from '../..//constants';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  colorIcon: {
    marginTop: -6,
    marginBottom: -6
  }
};

interface Props {
  classes?: Partial<Record<keyof typeof styles, string>>;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  currentTabUrl: string | null;
  options: any;
}

interface State {
  domainName: string;
  color: number;
  display: number;
  disableColors: boolean;
  emptyDomain: boolean;
}

class BottomBar extends React.Component<Props, State> {

  domainNameTextInputRef = React.createRef() as React.RefObject<HTMLInputElement>;

  constructor (props: any) {
    super(props);
    this.state = {
      domainName: '',
      color: 1,
      display: 1,
      disableColors: false,
      emptyDomain: false
    };

    this.handleDomainNameChange = this.handleDomainNameChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetCurrentUrl = this.handleGetCurrentUrl.bind(this);

  }

  componentDidMount () {
    addEventListener("keyup", (e: KeyboardEvent) => {
      const input = this.domainNameTextInputRef &&
                    this.domainNameTextInputRef.current &&
                    this.domainNameTextInputRef.current.firstChild as HTMLInputElement;
      const activeElementTagName = document.activeElement && document.activeElement.tagName;
      if (input && activeElementTagName === 'BODY' && ["1", "2", "3", "4", "5"].includes(e.key)) {
        this.handleGetCurrentUrl();
        switch (e.key) {
          case "1":
            this.setState({display: 1, color: 1});
            break;
          case "2":
            this.setState({display: 1, color: 2});
            break;
          case "3":
            this.setState({display: 1, color: 3});
            break;
          case "4":
            this.setState({display: 2, color: 0, disableColors: true});
            break;
          case "5":
            this.setState({display: 3, color: 0, disableColors: true});
            break;
        }
        input.focus();
      }
    });
  }

  handleDomainNameChange (event: any) {
    this.setState({domainName: event.target.value});
    if (event.target.value.length === 0) {
      this.setState({emptyDomain: true});
    }
  }

  handleDisplayChange (event: any) {
    const display = parseInt(event.target.value, 10);

    // Set display value and selected or default color
    this.setState({
      display,
      disableColors: false,
      color: this.state.color !== 0 ? this.state.color : 1
    });

    // Disable color field for non highlighted domains
    if (display !== 1) {
      this.setState({
        color: 0,
        disableColors: true
      });
    }
  }

  handleColorChange (event: any) {
    this.setState({color: parseInt(event.target.value, 10)});
  }

  handleSubmit (event: any) {
    event.preventDefault();

    let display: DisplayStyle = PARTIAL_HIDE;
    switch (this.state.display) {
      case 1: display = HIGHLIGHT; break;
      case 2: display = PARTIAL_HIDE; break;
      case 3: display = FULL_HIDE; break;
    }

    const color: Color = this.state.color ? 'COLOR_' + this.state.color : COLOR_1;

    // Check if domain field is not empty
    if (this.state.domainName.length !== 0) {
      if(this.state.color === 0) {
        this.props.addDomain(this.state.domainName, display);
      } else {
        this.props.addDomain(this.state.domainName, display, color);
      }
      this.setState({
        domainName: '',
        emptyDomain: false
      });
    } else {
      this.setState({emptyDomain: true});
    }

  }

  handleGetCurrentUrl () {
    if (this.props.currentTabUrl) {
      this.setState({
        domainName: this.props.currentTabUrl
      });
    }
  }

  render () {
    const classes = withStyles.getClasses(this.props);
    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar style={{paddingBottom: '10px'}}>
          <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <FormControl variant="standard" fullWidth>
                  <TextField
                    variant="standard"
                    error={this.state.emptyDomain}
                    label="Domain name"
                    value={this.state.domainName}
                    onChange={this.handleDomainNameChange}
                    slotProps={{
                      input: {
                        ref: this.domainNameTextInputRef,
                        endAdornment: <InputAdornment position="end">
                          <AddLocationIcon color="primary" onClick={this.handleGetCurrentUrl} style={{cursor: "pointer"}} />
                        </InputAdornment>,
                      }
                    }} />
                </FormControl>
              </Grid>
              <Grid item xs={3} sm={2}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="age-simple">Style</InputLabel>
                  <Select
                    variant="standard"
                    value={this.state.display}
                    onChange={this.handleDisplayChange}>
                    <MenuItem value="1" selected>Highlight</MenuItem>
                    <MenuItem value="2">Transparent</MenuItem>
                    <MenuItem value="3">Hide</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} sm={1}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="age-simple">Color</InputLabel>
                  <Select
                    variant="standard"
                    value={this.state.color}
                    onChange={this.handleColorChange}
                    disabled={this.state.disableColors}>
                    <MenuItem value="0" disabled><NoColorIcon className={classes.colorIcon} style={{color: '#607D8B'}} /></MenuItem>
                    <MenuItem value="1"><ColorIcon className={classes.colorIcon} style={{color: '#f50057'}} /></MenuItem>
                    <MenuItem value="2"><ColorIcon className={classes.colorIcon} style={{color: '#8BC34A'}} /></MenuItem>
                    <MenuItem value="3"><ColorIcon className={classes.colorIcon} style={{color: '#03A9F4'}} /></MenuItem>
                    { this.props.options.highlightColors?.map((color: string, i: number) => (
                      <MenuItem value={i+4}><ColorIcon className={classes.colorIcon} style={{color: `#${color}`}} /></MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl
                  variant="standard"
                  margin="dense"
                  fullWidth>
                  <Button type="submit" variant="contained" size="small" color="secondary">
                    Add <AddIcon />
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>

        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(BottomBar, styles);
