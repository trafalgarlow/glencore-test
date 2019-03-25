import React, {
  PureComponent, ReactNode, ComponentType, Fragment,
} from 'react';
import { Subtract } from 'utility-types';
import ConfirmDialog from './ConfirmDialog';


export interface WithConfirmDialogProps {
  confirmDialog: (message: ConfirmDialogOptions) => void;
}

export interface ConfirmDialogOptions {
  content: ReactNode;
  onConfirm: () => void;
  title?: ReactNode;
}

interface State {
  isVisible: boolean;
  message: ConfirmDialogOptions;
}

type ComplexHOCType<U extends object, K extends U> = ComponentType<Subtract<K, U>>;
type HOCProps<T extends WithConfirmDialogProps> = Subtract<T, WithConfirmDialogProps>;
export type HOCWithConfirmDialogType<P extends WithConfirmDialogProps> = ComplexHOCType<WithConfirmDialogProps, P>;

function withConfirmDialog<P extends WithConfirmDialogProps>(Component: ComponentType<P>): HOCWithConfirmDialogType<P> {
  return class WithConfirmDialogComponent extends PureComponent<HOCProps<P>, State> {
    state = {
      isVisible: false,
      message: {
        content: null,
        title: null,
        onConfirm: () => {},
      },
    };

    confirmDialog = (message: ConfirmDialogOptions): void => this.setState({ isVisible: true, message });

    close = (): void => {
      this.setState({
        isVisible: false,
        message: {
          content: null,
          title: null,
          onConfirm: () => {},
        },
      });
    };

    render(): ReactNode {
      const {
        isVisible,
        message: { content, title, onConfirm },
      } = this.state;

      return (
        <Fragment>
          <Component
            confirmDialog={this.confirmDialog}
            {...this.props as P}
          />
          <ConfirmDialog
            isOpen={isVisible}
            title={title}
            onConfirm={onConfirm}
            onClose={this.close}
          >
            {content}
          </ConfirmDialog>
        </Fragment>
      );
    }
  };
}

export default withConfirmDialog;
