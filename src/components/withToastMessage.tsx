import React, {
  PureComponent, ReactNode, ComponentType, Fragment,
} from 'react';
import { Subtract } from 'utility-types';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import ToastMessage, { ToastMessageType } from './ToastMessage';


export interface WithToastMessageProps {
  show: (message: ToastMessageOptions) => void;
  hide: () => void;
}

export interface ToastMessageOptions {
  content: ReactNode;
  autoHideDuration?: number;
  position?: SnackbarOrigin;
  type?: ToastMessageType;
}

interface State {
  isVisible: boolean;
  message: ToastMessageOptions;
}

type ComplexHOCType<U extends object, K extends U> = ComponentType<Subtract<K, U>>;
type HOCProps<T extends WithToastMessageProps> = Subtract<T, WithToastMessageProps>;
export type HOCWithToastMessageType<P extends WithToastMessageProps> = ComplexHOCType<WithToastMessageProps, P>;

function withToastMessage<P extends WithToastMessageProps>(Component: ComponentType<P>): HOCWithToastMessageType<P> {
  return class WithToastMessageComponent extends PureComponent<HOCProps<P>, State> {
    state = {
      isVisible: false,
      message: {
        content: null,
        autoHideDuration: undefined,
        position: undefined,
        type: undefined,
      },
    };

    messagesQueue: ToastMessageOptions[] = [];

    processMessagesQueue = (): void => {
      if (this.messagesQueue.length) {
        const message = this.messagesQueue.shift() as ToastMessageOptions;
        this.setState({ isVisible: true, message }, () => {
          this.messagesQueue = [];
        });
      }
    };

    show = (message: ToastMessageOptions): void => {
      const { isVisible } = this.state;

      if (message.content) {
        this.messagesQueue.push(message);
        if (isVisible) this.hide();
        else this.processMessagesQueue();
      }
    };

    hide = (): void => this.setState({ isVisible: false });

    render(): ReactNode {
      const {
        isVisible,
        message: {
          content, autoHideDuration, position, type,
        },
      } = this.state;

      return (
        <Fragment>
          <Component
            show={this.show}
            hide={this.hide}
            {...this.props as P}
          />
          <ToastMessage
            open={isVisible}
            onClose={this.hide}
            type={type}
            onExited={this.processMessagesQueue}
            autoHideDuration={autoHideDuration}
            position={position}
          >
            {content}
          </ToastMessage>
        </Fragment>
      );
    }
  };
}

export default withToastMessage;
