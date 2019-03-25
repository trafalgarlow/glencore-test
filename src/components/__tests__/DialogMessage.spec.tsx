import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  Dialog, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core';
import DialogMessage, { DialogMessageProps } from '../DialogMessage';

const mockOnClose = jest.fn().mockImplementation(() => {});

let component: ShallowWrapper<DialogMessageProps>;

describe('DialogMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    component = shallow<DialogMessage>(
      <DialogMessage
        title="title"
        closeElement="close"
        confirmElement="confirm"
        isOpen
        onClose={mockOnClose}
      >
        content
      </DialogMessage>,
    );
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the Dialog', () => {
    expect(component.find(Dialog)).toHaveLength(1);
  });

  describe('DialogContent', () => {
    it('should be rendered', () => {
      expect(component.find(DialogContent)).toHaveLength(1);
    });

    it('should render the children of the component as its child', () => {
      expect(component.find(DialogContent).childAt(0).text()).toEqual('content');
    });
  });

  describe('DialogActions', () => {
    it('should be rendered', () => {
      expect(component.find(DialogActions)).toHaveLength(1);
    });

    it('should render the closeElement prop of the component as its first child', () => {
      expect(component.find(DialogActions).childAt(0).text()).toEqual('close');
    });

    it('should render the confirmElement prop of the component as its second child', () => {
      expect(component.find(DialogActions).childAt(1).text()).toEqual('confirm');
    });
  });

  describe('DialogTitle', () => {
    it('should be rendered', () => {
      expect(component.find(DialogTitle)).toHaveLength(1);
    });

    it('should render the title prop of the component as its child', () => {
      expect(component.find(DialogTitle).childAt(0).text()).toEqual('title');
    });
  });
});
