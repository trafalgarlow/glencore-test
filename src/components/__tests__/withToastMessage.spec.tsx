import React, { ReactNode, PureComponent } from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import ToastMessage from 'components/ToastMessage';
import withToastMessage, { WithToastMessageProps, ToastMessageOptions, HOCWithToastMessageType } from '../withToastMessage';

jest.mock('../ToastMessage');

interface WrappedComponentProps {
  test: string;
}

type HOCProps = WrappedComponentProps & WithToastMessageProps;

class WrappedComponent extends PureComponent<HOCProps> {
  render(): ReactNode {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { show, hide, ...otherProps } = this.props;

    return (
      <div
        id="wrapped-compoent"
        {...otherProps}
      />
    );
  }
}

interface HOCComponentType extends PureComponent<WrappedComponentProps> {
  messagesQueue: ToastMessageOptions[];
  processMessagesQueue: () => void;
  show(message: ToastMessageOptions): void;
  hide: () => void;
}

const HOCComponent: HOCWithToastMessageType<HOCProps> = withToastMessage(WrappedComponent);

const position: SnackbarOrigin = { horizontal: 'right', vertical: 'top' };
let component: ShallowWrapper<HOCProps>;
let instance: HOCComponentType;

describe('withToastMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be a funcion', () => {
    expect(typeof withToastMessage).toEqual('function');
  });

  describe('HOC withToastMessage', () => {
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

      describe('show injected prop', () => {
        let showProp: (message: ToastMessageOptions) => void;
        beforeEach(() => {
          showProp = component.find(WrappedComponent).prop('show');
        });

        it('should be defined', () => {
          expect(showProp).toBeDefined();
        });

        it('should be equal to the HOC Component show method', () => {
          expect(showProp).toEqual(instance.show);
        });
      });

      describe('hide injected prop', () => {
        it('should be defined', () => {
          expect(component.find(WrappedComponent).prop('hide')).toBeDefined();
        });

        it('should be equal to the HOC Component hide method', () => {
          expect(component.find(WrappedComponent).prop('hide')).toEqual(instance.hide);
        });
      });
    });

    describe('ToastMessage', () => {
      it('should have the open prop to false', () => {
        expect(component.find(ToastMessage).prop('open')).toBeFalsy();
      });

      it('should have the onClose prop to the hide method', () => {
        expect(component.find(ToastMessage).prop('onClose')).toEqual(instance.hide);
      });

      it('should have the onExited prop to the processMessagesQueue method', () => {
        expect(component.find(ToastMessage).prop('onExited')).toEqual(instance.processMessagesQueue);
      });
    });

    describe('show', () => {
      beforeEach(() => {
        jest.spyOn(instance, 'hide').mockImplementation(() => {});
        jest.spyOn(instance, 'processMessagesQueue').mockImplementation(() => {});
      });

      it('should not call the inner methods if the message content is null', () => {
        const message: ToastMessageOptions = {
          content: null,
          autoHideDuration: 1000,
          position,
        };
        instance.show(message);
        expect(instance.hide).not.toHaveBeenCalled();
        expect(instance.processMessagesQueue).not.toHaveBeenCalled();
      });

      describe('Message content not null', () => {
        let message: ToastMessageOptions;

        beforeEach(() => {
          message = {
            content: 'message-content',
            autoHideDuration: 1000,
            position,
          };
        });

        it('should add the message to the queue', () => {
          instance.show(message);
          expect(instance.messagesQueue).toEqual([message]);
        });

        it('should call the processMessagesQueue method if the ToastMessage is not already visible', () => {
          instance.show(message);
          expect(instance.processMessagesQueue).toHaveBeenCalled();
        });

        it('should call the hide method if the ToastMessage is already visible', () => {
          component.setState({ isVisible: true });
          instance.show(message);
          expect(instance.hide).toHaveBeenCalled();
        });
      });
    });

    describe('hide', () => {
      it('should call the setState hiding the ToastMessage', () => {
        jest.spyOn(instance, 'setState');
        instance.hide();
        expect(instance.setState).toHaveBeenCalledWith({ isVisible: false });
      });
    });

    describe('processMessagesQueue', () => {
      beforeEach(() => {
        jest.spyOn(instance, 'setState');
      });

      it('should not call the setState if the messagesQueue is empty yet', () => {
        instance.processMessagesQueue();
        expect(instance.setState).not.toHaveBeenCalled();
      });

      describe('messagesQueue not empty', () => {
        let message1: ToastMessageOptions;
        let message2: ToastMessageOptions;

        beforeEach(() => {
          message1 = {
            content: 'message-content-1',
            autoHideDuration: 1000,
            position,
          };
          message2 = {
            content: 'message-content-2',
            autoHideDuration: 2000,
            position,
          };
          instance.messagesQueue.push(message1);
          instance.messagesQueue.push(message2);
          instance.processMessagesQueue();
        });

        it('should remove the messages from the messagesQueue', () => {
          expect(instance.messagesQueue).toHaveLength(0);
        });

        it('should call display the first message in the queue', () => {
          expect(instance.setState).toHaveBeenCalledWith({
            isVisible: true,
            message: message1,
          }, expect.any(Function));
        });
      });
    });
  });
});
