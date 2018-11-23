import * as React from "react";
import { Snackbar, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
      if (nextProps.options.showAll) {
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
          autoHideDuration={6000}
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
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }
}

export default SnackBar;
