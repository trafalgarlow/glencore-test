import React, { PureComponent, ReactNode } from 'react';
import {
  Dialog, AppBar, Toolbar, IconButton, Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions/transition';


export interface FullScreenDialogRenderProps {
  close: () => void;
}

export interface FullScreenDialogProps {
  isOpen?: boolean;
  title: ReactNode;
  onClose: () => void;
  children: (renderProps: FullScreenDialogRenderProps) => ReactNode;
}

interface State {
  isOpen: boolean;
}

class FullScreenDialog extends PureComponent<FullScreenDialogProps, State> {
  static defaultProps = { isOpen: true, onClose: () => {}, title: null };

  state = { isOpen: true };

  onClose = (): void => {
    const { onClose } = this.props;
    onClose();
    this.setState({ isOpen: false });
  };

  render(): ReactNode {
    const { title, children } = this.props;
    const { isOpen } = this.state;

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={this.onClose}
        TransitionComponent={(props: TransitionProps) => <Slide direction="up" {...props} />}
      >
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" onClick={this.onClose}>
              <Close />
            </IconButton>
            {title}
          </Toolbar>
        </AppBar>
        <div>
          {children({ close: this.onClose })}
        </div>
      </Dialog>
    );
  }
}

export default FullScreenDialog;
