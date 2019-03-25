import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button } from '@material-ui/core';
import DialogMessage from 'components/DialogMessage';
import AlertDialog, { AlertDialogProps } from '../AlertDialog';

jest.mock('../DialogMessage');

let component: ShallowWrapper<AlertDialogProps>;
const mockOnClose: jest.Mock = jest.fn().mockImplementation(() => {});

describe('AlertDialog', () => {
  beforeEach(() => {
    component = shallow<AlertDialog>(
      <AlertDialog
        isOpen
        onClose={mockOnClose}
        title="alert dialog title"
      >
        alert dialog content
      </AlertDialog>,
    );
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('DialogMessage', () => {
    it('should be rendered', () => {
      expect(component.find(DialogMessage)).toHaveLength(1);
    });

    it('should assign the onClose prop to the onClick prop of the rendered closeElement', () => {
      const dived: ShallowWrapper = component.find(DialogMessage).dive();
      expect(dived.find(Button).prop('onClick')).toEqual(mockOnClose);
    });
  });
});
