import * as React from 'react';
import withStyles from '@mui/styles/withStyles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import ColorIcon from '@mui/icons-material/InvertColors';
import NoColorIcon from '@mui/icons-material/InvertColorsOff';
import CloseIcon from '@mui/icons-material/Close';
import { DisplayStyle, Color, Domain } from '../../types';
import { HIGHLIGHT, FULL_HIDE, PARTIAL_HIDE, COLOR_1 } from '../../constants';

interface Props {
  classes: any;
  open: number | null;
  domain: Domain | null;
  editDomain: (index: number, domainName: string, display: DisplayStyle, color?: Color) => void;
  closeEditionHandle: () => void;
  options: any;
}

interface State {
  domainName: string;
  color: number;
  display: number;
  disableColors: boolean;
  emptyDomain: boolean;
}

const styles = {
  root: {
    flexGrow: 1,
    padding: 8
  },
  grow: {
    flexGrow: 1,
  },
  colorIcon: {
    marginTop: -6,
    marginBottom: -6
  },
  rainbow: {
    marginTop: -6,
    marginBottom: -6,
    backgroundImage: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
    color: 'transparent!important',
    borderRadius: 15
  },
  flex: {
    flex: 1,
  },
};

function Transition (props: any) {
  return <Slide direction="right" {...props} />;
}

class EditDomain extends React.Component<Props, State> {

  constructor (props: any) {
    super(props);
    this.state = {
      domainName: '',
      color: 0,
      display: 2,
      disableColors: true,
      emptyDomain: false
    };

    this.handleDomainNameChange = this.handleDomainNameChange.bind(this);
    this.handleDisplayChange = this.handleDisplayChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps (nextProps: any) {
    if (this.props.domain !== nextProps.domain) {
      if (nextProps.domain !== null) {
        let display: number = 0;
        switch (nextProps.domain.display) {
          case HIGHLIGHT: display = 1; break;
          case PARTIAL_HIDE: display = 2; break;
          case FULL_HIDE: display = 3; break;
        }

        const color: number = nextProps.domain.color?.split("_").pop() ?? 0;

        this.setState({
          domainName: nextProps.domain.domainName,
          color: color,
          display: display,
          disableColors: color === 0
        });
      } else {
        this.setState({
          domainName: '',
          color: 0,
          display: 2,
          disableColors: true
        });
      }
    }
  }

  handleDomainNameChange (event: any) {
    this.setState({ domainName: event.target.value });
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
      color: this.state.color !==0 ? this.state.color : 1
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
    this.setState({ color: parseInt(event.target.value, 10) });
  }

  handleSave (event: any) {
    event.preventDefault();

    let display: DisplayStyle = PARTIAL_HIDE;
    switch (this.state.display) {
      case 1: display = HIGHLIGHT; break;
      case 2: display = PARTIAL_HIDE; break;
      case 3: display = FULL_HIDE; break;
    }

    const color: Color = this.state.color ? 'COLOR_' + this.state.color : COLOR_1;

    if (this.props.open !== null) {
      // Check if domain field is not empty
      if (this.state.domainName.length !== 0) {
        if (this.state.color === 0) {
          this.props.editDomain(this.props.open, this.state.domainName, display);
        } else {
          this.props.editDomain(this.props.open, this.state.domainName, display, color);
        }
      } else {
        this.setState({ emptyDomain: true });
      }
    }

    this.props.closeEditionHandle();
  }

  handleClose = () => {
    this.props.closeEditionHandle();
  }

  render () {
    const classes = this.props.classes;
    return (
      <Dialog
        fullScreen
        open={this.props.open !== null}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Edit
            </Typography>
            <Button color="inherit" onClick={this.handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form onSubmit={this.handleSave} className={classes.root} autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl variant="standard" fullWidth>
                <TextField
                  variant="standard"
                  error={this.state.emptyDomain}
                  label="Domain"
                  id="margin-none"
                  className={classes.textField}
                  value={this.state.domainName}
                  onChange={this.handleDomainNameChange} />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl variant="standard" fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Style</InputLabel>
                <Select
                  variant="standard"
                  value={this.state.display}
                  onChange={this.handleDisplayChange}>
                  <MenuItem value="1">Highlight</MenuItem>
                  <MenuItem value="2">Transparent</MenuItem>
                  <MenuItem value="3">Hide</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="standard" fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Color</InputLabel>
                <Select
                  variant="standard"
                  value={this.state.color}
                  onChange={this.handleColorChange}
                  disabled={this.state.disableColors}>
                  <MenuItem value="0" disabled><NoColorIcon className={classes.colorIcon} style={{ color: '#607D8B' }} /></MenuItem>
                  <MenuItem value="1"><ColorIcon className={classes.colorIcon} style={{ color: '#f50057' }} /></MenuItem>
                  <MenuItem value="2"><ColorIcon className={classes.colorIcon} style={{ color: '#8BC34A' }} /></MenuItem>
                  <MenuItem value="3"><ColorIcon className={classes.colorIcon} style={{ color: '#03A9F4' }} /></MenuItem>
                  { this.props.options.highlightColors?.map((color: string, i: number) => (
                      <MenuItem value={i+4}>
                        <ColorIcon
                          className={ color.includes('super') ? classes.rainbow : classes.colorIcon}
                          style={{color: `#${color}`}} />
                      </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EditDomain);
