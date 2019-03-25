import React, {
  PureComponent, ReactNode, ComponentType, Fragment,
} from 'react';
import { Subtract } from 'utility-types';
import AlertDialog from './AlertDialog';


export interface WithAlertDialogProps {
  alertDialog: (message: AlertDialogOptions) => void;
}

export interface AlertDialogOptions {
  content: ReactNode;
  title?: ReactNode;
}

interface State {
  isVisible: boolean;
  message: AlertDialogOptions;
}

type ComplexHOCType<U extends object, K extends U> = ComponentType<Subtract<K, U>>;
type HOCProps<T extends WithAlertDialogProps> = Subtract<T, WithAlertDialogProps>;
export type HOCWithAlertDialogType<P extends WithAlertDialogProps> = ComplexHOCType<WithAlertDialogProps, P>;

function withAlertDialog<P extends WithAlertDialogProps>(Component: ComponentType<P>): HOCWithAlertDialogType<P> {
  return class WithAlertDialogComponent extends PureComponent<HOCProps<P>, State> {
    state = {
      isVisible: false,
      message: {
        content: null,
        title: null,
      },
    };

    alertDialog = (message: AlertDialogOptions): void => this.setState({ isVisible: true, message });

    close = (): void => {
      this.setState({
        isVisible: false,
        message: {
          content: null,
          title: null,
        },
      });
    };

    render(): ReactNode {
      const {
        isVisible,
        message: { content, title },
      } = this.state;

      return (
        <Fragment>
          <Component
            alertDialog={this.alertDialog}
            {...this.props as P}
          />
          <AlertDialog
            isOpen={isVisible}
            title={title}
            onClose={this.close}
          >
            {content}
          </AlertDialog>
        </Fragment>
      );
    }
  };
}

export default withAlertDialog;
