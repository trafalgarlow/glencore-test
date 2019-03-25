import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Snackbar, IconButton } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import ToastMessage, { ToastMessageProps } from '../ToastMessage';

const position: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };
const mockOnClose: jest.Mock = jest.fn().mockImplementation(() => {});
const mockOnExit: jest.Mock = jest.fn().mockImplementation(() => {});

let component: ShallowWrapper<ToastMessageProps>;
let instance: ToastMessage;

describe('ToastMessage', () => {
  beforeEach(() => {
    component = shallow<ToastMessage>(
      <ToastMessage
        open
        autoHideDuration={1000}
        position={position}
        onClose={mockOnClose}
        onExited={mockOnExit}
      >
        message content
      </ToastMessage>,
    );
    instance = component.instance() as ToastMessage;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Snackbar', () => {
    it('should be rendered', () => {
      expect(component.find(Snackbar)).toHaveLength(1);
    });

    it('should have the anchorOrigin prop as the position prop', () => {
      expect(component.find(Snackbar).prop('anchorOrigin')).toEqual(position);
    });

    it('should have the open prop set to true by default', () => {
      expect(component.find(Snackbar).prop('open')).toBeTruthy();
    });

    it('should change the open prop if the main open prop changes', () => {
      component.setProps({ open: false });
      expect(component.find(Snackbar).prop('open')).toBeFalsy();
    });

    it('should set the onClose prop as the handleClose method', () => {
      expect(component.find(Snackbar).prop('onClose')).toEqual(instance.handleClose);
    });

    it('should set the onExited prop as the main onExit prop', () => {
      expect(component.find(Snackbar).prop('onExited')).toEqual(mockOnExit);
    });

    it('should set the message prop as the children prop', () => {
      expect(component.find(Snackbar).prop('message')).toEqual('message content');
    });

    it('should render as message the main children prop', () => {
      expect(component.dive().find('#message').text()).toEqual('message content');
    });

    describe('Action', () => {
      let action: ShallowWrapper;
      beforeEach(() => {
        action = component.dive().find(IconButton);
      });

      it('should be rendered', () => {
        expect(action).toHaveLength(1);
      });

      it('should have the onClick prop to the onClose prop', () => {
        expect(action.prop('onClick')).toEqual(mockOnClose);
      });
    });
  });

  describe('handleClose', () => {
    it('should call the onClose prop if the close reason is not "clickaway"', () => {
      instance.handleClose({}, 'closing');
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should not call the onClose prop if the close reason is "clickaway"', () => {
      instance.handleClose({}, 'clickaway');
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
