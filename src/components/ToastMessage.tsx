import React, { PureComponent, ReactNode } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Close } from '@material-ui/icons';


export enum ToastMessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface ToastMessageProps {
  open: boolean;
  /** The time needed in order to auto close the toast. Pass undefined for disabling the auto hide feature **/
  autoHideDuration?: number;
  /** Position to use for displaying the toast **/
  position: SnackbarOrigin;
  /** Message to be displayed **/
  children: ReactNode;
  /** Type of the toast message to be displayed **/
  type?: ToastMessageType,
  onClose: () => void;
  onExited: () => void;
}

class ToastMessage extends PureComponent<ToastMessageProps> {
  static defaultProps = {
    position: { vertical: 'bottom', horizontal: 'right' },
    type: ToastMessageType.SUCCESS,
  };

  handleClose = (event: object, reason: string): void => {
    const { onClose } = this.props;
    return reason === 'clickaway' ? undefined : onClose();
  };

  render(): ReactNode {
    const {
      open, onClose, children, onExited, autoHideDuration, position, type,
    } = this.props;

    const toastMessageClass = `toast-message-${type}`;

    return (
      <Snackbar
        className={toastMessageClass}
        anchorOrigin={position}
        open={open}
        onClose={this.handleClose}
        onExited={onExited}
        autoHideDuration={autoHideDuration}
        message={children}
        action={(
          <IconButton color="inherit" onClick={onClose}>
            <Close />
          </IconButton>
        )}
      />
    );
  }
}

export default ToastMessage;
