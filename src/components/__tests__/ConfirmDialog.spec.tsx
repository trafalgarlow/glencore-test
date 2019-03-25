import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button } from '@material-ui/core';
import DialogMessage from 'components/DialogMessage';
import ConfirmDialog, { ConfirmDialogProps } from '../ConfirmDialog';

jest.mock('../DialogMessage');

let component: ShallowWrapper<ConfirmDialogProps>;
let instance: ConfirmDialog;
const mockOnClose: jest.Mock = jest.fn().mockImplementation(() => {});
const mockOnConfirm: jest.Mock = jest.fn().mockImplementation(() => {});

describe('ConfirmDialog', () => {
  beforeEach(() => {
    component = shallow<ConfirmDialog>(
      <ConfirmDialog
        isOpen
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="alert dialog title"
      >
        alert dialog content
      </ConfirmDialog>,
    );
    instance = component.instance() as ConfirmDialog;
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
      expect(dived.find(Button).at(0).prop('onClick')).toEqual(mockOnClose);
    });

    it('should assign the onConfirm method to the onClick prop of the rendered confirmElement', () => {
      const dived: ShallowWrapper = component.find(DialogMessage).dive();
      expect(dived.find(Button).at(1).prop('onClick')).toEqual(instance.onConfirm);
    });
  });

  describe('onConfirm', () => {
    beforeEach(() => {
      instance.onConfirm();
    });

    it('should call the prop method onClose', () => {
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call the prop method onConfirm', () => {
      expect(mockOnConfirm).toHaveBeenCalled();
    });
  });
});
