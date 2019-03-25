import React, { ReactNode, PureComponent } from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import ConfirmDialog, { ConfirmDialogProps } from 'components/ConfirmDialog';
import withConfirmDialog, { WithConfirmDialogProps, ConfirmDialogOptions, HOCWithConfirmDialogType } from '../withConfirmDialog';

jest.mock('../ConfirmDialog');

interface WrappedComponentProps {
  test: string;
}

type HOCProps = WrappedComponentProps & WithConfirmDialogProps;

class WrappedComponent extends PureComponent<HOCProps> {
  render(): ReactNode {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { confirmDialog, ...otherProps } = this.props;

    return (
      <div
        id="wrapped-compoent"
        {...otherProps}
      />
    );
  }
}

interface HOCComponentType extends PureComponent<WrappedComponentProps> {
  confirmDialog(message: ConfirmDialogOptions): void;
  close: () => void;
}

const mockOnConfirm = jest.fn().mockImplementation(() => {});
const message: ConfirmDialogOptions = {
  content: 'message-content',
  title: 'message-title',
  onConfirm: mockOnConfirm,
};

const HOCComponent: HOCWithConfirmDialogType<HOCProps> = withConfirmDialog(WrappedComponent);
let component: ShallowWrapper<HOCProps>;
let instance: HOCComponentType;

describe('withConfirmDialog', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be a funcion', () => {
    expect(typeof withConfirmDialog).toEqual('function');
  });

  describe('HOC withConfirmDialog', () => {
    beforeEach(() => {
      component = shallow<HOCProps>(
        <HOCComponent test="test-prop-value" />,
      );
      instance = component.instance() as HOCComponentType;
    });

    it('should be rendered', () => {
      expect(component).toHaveLength(1);
    });

    describe('WrappedComponent', () => {
      it('should be rendered', () => {
        expect(component.find(WrappedComponent)).toHaveLength(1);
      });

      it('should keep the initial prop', () => {
        expect(component.find(WrappedComponent).prop('test')).toEqual('test-prop-value');
      });

      describe('confirmDialog injected prop', () => {
        let confirmDialogProp: (message: ConfirmDialogOptions) => void;
        beforeEach(() => {
          confirmDialogProp = component.find(WrappedComponent).prop('confirmDialog');
        });

        it('should be defined', () => {
          expect(confirmDialogProp).toBeDefined();
        });

        it('should be equal to the HOC Component alertDialog method', () => {
          expect(confirmDialogProp).toEqual(instance.confirmDialog);
        });

        it('should call the set state of the HOC Component when called', () => {
          jest.spyOn(instance, 'setState');
          confirmDialogProp(message);
          expect(instance.setState).toHaveBeenCalledWith({ isVisible: true, message });
        });
      });
    });

    describe('ConfirmDialog', () => {
      it('should have the isOpen prop to false', () => {
        expect(component.find(ConfirmDialog).prop('isOpen')).toBeFalsy();
      });

      it('should have the onClose prop to the close method', () => {
        expect(component.find(ConfirmDialog).prop('onClose')).toEqual(instance.close);
      });
    });

    describe('confirmDialog', () => {
      let confirmDialogComponent: ShallowWrapper<ConfirmDialogProps>;
      beforeEach(() => {
        jest.spyOn(instance, 'setState');
        instance.confirmDialog(message);
        confirmDialogComponent = component.find(ConfirmDialog);
      });

      it('should call the setState method', () => {
        expect(instance.setState).toHaveBeenCalledWith({ isVisible: true, message });
      });

      it('should set the isOpen prop of the ConfirmDialog to true', () => {
        expect(confirmDialogComponent.prop('isOpen')).toBeTruthy();
      });

      it('should set the title prop of the ConfirmDialog to the message title', () => {
        expect(confirmDialogComponent.prop('title')).toEqual('message-title');
      });

      it('should set the onConfirm prop of the ConfirmDialog to the message onConfirm', () => {
        expect(confirmDialogComponent.prop('onConfirm')).toEqual(mockOnConfirm);
      });

      it('should set the children prop of the ConfirmDialog to the message content', () => {
        expect(confirmDialogComponent.prop('children')).toEqual('message-content');
      });
    });

    describe('close', () => {
      it('should reset the state', () => {
        component.setState({ isVisible: true, message });
        instance.close();
        expect(component.state()).toEqual({ isVisible: false, message: { title: null, content: null, onConfirm: expect.any(Function) } });
      });
    });
  });
});
