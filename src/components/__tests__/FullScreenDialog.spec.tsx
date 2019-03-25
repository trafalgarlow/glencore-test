import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Dialog, AppBar, IconButton } from '@material-ui/core';
import FullScreenDialog, { FullScreenDialogRenderProps, FullScreenDialogProps } from '../FullScreenDialog';

const mockOnClose = jest.fn().mockImplementation(() => {});

let component: ShallowWrapper<FullScreenDialogProps>;
let instance: FullScreenDialog;

describe('FullScreenDialog', () => {
  beforeEach(() => {
    component = shallow<FullScreenDialog>(
      <FullScreenDialog
        isOpen
        onClose={mockOnClose}
        title={<div id="title">title</div>}
      >
        {
          (props: FullScreenDialogRenderProps) => (
            <div
              id="rendered-props"
              {...props}
            >
              rendered prop content
            </div>
          )
        }
      </FullScreenDialog>,
    );
    instance = component.instance() as FullScreenDialog;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Dialog', () => {
    it('should be rendered', () => {
      expect(component.find(Dialog)).toHaveLength(1);
    });

    it('should be full screen', () => {
      expect(component.find(Dialog).prop('fullScreen')).toBeTruthy();
    });

    it('should be open by default', () => {
      expect(component.find(Dialog).prop('open')).toBeTruthy();
    });

    it('should not be open when you update the isOpen state of the component', () => {
      component.setState({ isOpen: false });
      expect(component.find(Dialog).prop('open')).toBeFalsy();
    });

    it('should assign the onClose method as onClose prop', () => {
      expect(component.find(Dialog).prop('onClose')).toEqual(instance.onClose);
    });
  });

  describe('AppBar', () => {
    it('should be rendered', () => {
      expect(component.find(AppBar)).toHaveLength(1);
    });

    it('should display the title as child', () => {
      expect(component.find(AppBar).find('#title').childAt(0).text()).toEqual('title');
    });

    describe('IconButton', () => {
      it('should be rendered', () => {
        expect(component.find(AppBar).find(IconButton)).toHaveLength(1);
      });

      it('should assign the onClose method to the onClick prop', () => {
        expect(component.find(AppBar).find(IconButton).prop('onClick')).toEqual(instance.onClose);
      });
    });
  });

  describe('Rendered Prop Component', () => {
    it('should be rendered', () => {
      expect(component.find('#rendered-props')).toHaveLength(1);
    });

    it('should render the child', () => {
      expect(component.find('#rendered-props').childAt(0).text()).toEqual('rendered prop content');
    });

    it('should assign the onClose method to the close prop', () => {
      expect(component.find('#rendered-props').prop('close')).toEqual(instance.onClose);
    });

    it('should call the onClose method if you call the close prop', () => {
      jest.spyOn(instance, 'onClose').mockImplementation(() => {});
      component.update();
      instance.forceUpdate();
      (component.find('#rendered-props').prop('close') as Function)();
      expect(instance.onClose).toHaveBeenCalled();
    });
  });

  describe('onClose', () => {
    beforeEach(() => {
      jest.spyOn(instance, 'setState').mockImplementation(() => {});
      instance.onClose();
    });

    it('should call the onClose prop', () => {
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should set the isOpen state to false', () => {
      expect(instance.setState).toHaveBeenCalledWith({ isOpen: false });
    });
  });
});
