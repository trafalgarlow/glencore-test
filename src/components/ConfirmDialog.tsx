import React, { ReactNode, PureComponent } from 'react';
import { Button } from '@material-ui/core';
import { AlertDialogProps } from './AlertDialog';
import DialogMessage from './DialogMessage';


export interface ConfirmDialogProps extends AlertDialogProps {
  onConfirm: () => void;
}

class ConfirmDialog extends PureComponent<ConfirmDialogProps> {
  onConfirm = (): void => {
    const { onClose, onConfirm } = this.props;
    onConfirm();
    onClose();
  };

  render(): ReactNode {
    const {
      children, isOpen, onClose, title,
    } = this.props;

    return (
      <DialogMessage
        isOpen={isOpen}
        title={title}
        closeElement={<Button variant="contained" className="hvr-radial-in" color="primary" onClick={onClose}>CANCEL</Button>}
        confirmElement={<Button variant="contained" className="hvr-radial-in" color="primary" onClick={this.onConfirm}>CONFIRM</Button>}
        onClose={onClose}
      >
        {children}
      </DialogMessage>
    );
  }
}

export default ConfirmDialog;
