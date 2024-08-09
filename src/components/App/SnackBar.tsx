import * as React from "react";
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  options: any;
  toggleShowAll: () => void;
}

interface State {
  open: boolean;
}

class SnackBar extends React.Component<Props, State> {
  state = {
    open: false,
    message: 'Hidden results are displayed now!'
  };

  componentWillUpdate (nextProps: Props) {
    if (this.props.options.showAll !== nextProps.options.showAll) {
      if (nextProps.options.showAll === true) {
        this.setState({open: true});
      }
    }
  }

  handleClose = () => {
    this.setState(state => ({ open: !state.open }));
  }

  handleShowThem = () => {
    this.props.toggleShowAll();
    this.handleClose();
  }

  render () {
    return (
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.state.message}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleShowThem}>
              Hide them
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
              size="large">
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }
}

export default SnackBar;
