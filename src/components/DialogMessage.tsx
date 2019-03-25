import React, { PureComponent, ReactNode } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';

export interface DialogMessageProps {
  isOpen: boolean;
  onClose: () => void;
  closeElement: ReactNode;
  confirmElement?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
}

class DialogMessage extends PureComponent<DialogMessageProps> {
  render(): ReactNode {
    const {
      isOpen, title, children, closeElement, confirmElement, onClose,
    } = this.props;

    return (
      <Dialog open={isOpen} onClose={onClose}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {closeElement}
          {confirmElement}
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogMessage;
