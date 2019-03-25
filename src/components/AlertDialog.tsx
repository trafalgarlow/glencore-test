import React, { ReactNode, PureComponent } from 'react';
import { Button } from '@material-ui/core';
import DialogMessage, { DialogMessageProps } from './DialogMessage';


export type AlertDialogProps = Pick<DialogMessageProps, 'isOpen' | 'title' | 'children' | 'onClose'>;

class AlertDialog extends PureComponent<AlertDialogProps> {
  render(): ReactNode {
    const {
      children, isOpen, onClose, title,
    } = this.props;

    return (
      <DialogMessage
        isOpen={isOpen}
        title={title}
        closeElement={<Button variant="contained" className="hvr-radial-in" color="primary" onClick={onClose}>OK</Button>}
        onClose={onClose}
      >
        {children}
      </DialogMessage>
    );
  }
}

export default AlertDialog;
