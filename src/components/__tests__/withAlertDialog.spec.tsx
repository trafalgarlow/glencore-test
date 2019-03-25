import React, { ReactNode, PureComponent } from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import AlertDialog, { AlertDialogProps } from 'components/AlertDialog';
import withAlertDialog, { WithAlertDialogProps, AlertDialogOptions, HOCWithAlertDialogType } from '../withAlertDialog';

jest.mock('../AlertDialog');

interface WrappedComponentProps {
  test: string;
}

type HOCProps = WrappedComponentProps & WithAlertDialogProps;

class WrappedComponent extends PureComponent<HOCProps> {
  render(): ReactNode {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { alertDialog, ...otherProps } = this.props;

    return (
      <div
        id="wrapped-compoent"
        {...otherProps}
      />
    );
  }
}

interface HOCComponentType extends PureComponent<WrappedComponentProps> {
  alertDialog(message: AlertDialogOptions): void;
  close: () => void;
}

const message: AlertDialogOptions = {
  content: 'message-content',
  title: 'message-title',
};

const HOCComponent: HOCWithAlertDialogType<HOCProps> = withAlertDialog(WrappedComponent);
let component: ShallowWrapper<HOCProps>;
let instance: HOCComponentType;

describe('withAlertDialog', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be a funcion', () => {
    expect(typeof withAlertDialog).toEqual('function');
  });

  describe('HOC withAlertDialog', () => {
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

      describe('alertDialog injected prop', () => {
        let alertDialogProp: (message: AlertDialogOptions) => void;
        beforeEach(() => {
          alertDialogProp = component.find(WrappedComponent).prop('alertDialog');
        });

        it('should be defined', () => {
          expect(alertDialogProp).toBeDefined();
        });

        it('should be equal to the HOC Component alertDialog method', () => {
          expect(alertDialogProp).toEqual(instance.alertDialog);
        });

        it('should call the set state of the HOC Component when called', () => {
          jest.spyOn(instance, 'setState');
          alertDialogProp(message);
          expect(instance.setState).toHaveBeenCalledWith({ isVisible: true, message });
        });
      });
    });

    describe('AlertDialog', () => {
      it('should have the isOpen prop to false', () => {
        expect(component.find(AlertDialog).prop('isOpen')).toBeFalsy();
      });

      it('should have the onClose prop to the close method', () => {
        expect(component.find(AlertDialog).prop('onClose')).toEqual(instance.close);
      });
    });

    describe('alertDialog', () => {
      let alertDialogComponent: ShallowWrapper<AlertDialogProps>;
      beforeEach(() => {
        jest.spyOn(instance, 'setState');
        instance.alertDialog(message);
        alertDialogComponent = component.find(AlertDialog);
      });

      it('should call the setState method', () => {
        expect(instance.setState).toHaveBeenCalledWith({ isVisible: true, message });
      });

      it('should set the isOpen prop of the AlertDialog to true', () => {
        expect(alertDialogComponent.prop('isOpen')).toBeTruthy();
      });

      it('should set the title prop of the AlertDialog to the message title', () => {
        expect(alertDialogComponent.prop('title')).toEqual('message-title');
      });

      it('should set the children prop of the AlertDialog to the message content', () => {
        expect(alertDialogComponent.prop('children')).toEqual('message-content');
      });
    });

    describe('close', () => {
      it('should reset the state', () => {
        component.setState({ isVisible: true, message });
        instance.close();
        expect(component.state()).toEqual({ isVisible: false, message: { title: null, content: null } });
      });
    });
  });
});
