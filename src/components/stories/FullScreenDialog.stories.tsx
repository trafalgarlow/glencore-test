import React, { ReactNode, PureComponent } from 'react';
import {
  storiesOf, Story, RenderFunction, forceReRender,
} from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button } from '@material-ui/core';
import FullScreenDialog, { FullScreenDialogRenderProps, FullScreenDialogProps } from '../FullScreenDialog';

const stories: Story = storiesOf('Full Screen Dialog', module);

interface FullScreenDialogImplProps extends FullScreenDialogProps{
  isVisible: boolean;
}

class FullScreenDialogImpl extends PureComponent<FullScreenDialogImplProps, {}> {
  render(): ReactNode {
    const { isVisible, children } = this.props;

    return (
      <div>
        {
          isVisible
          && (
          <FullScreenDialog {...this.props}>
            {
              /* eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars */
              (renderProps: FullScreenDialogRenderProps): ReactNode => (
                <div>
                  {children(renderProps)}
                </div>
              )
            }
          </FullScreenDialog>
          )
        }
      </div>
    );
  }
}


let isVisible = true;
const story: RenderFunction = (): JSX.Element => {
  const content = text('Content:', 'Message Content');
  const title = text('Title:', 'Title');
  const onClose = (): void => {
    isVisible = false;
    action('triggered on close')();
    forceReRender();
  };
  const onOpen = (): void => {
    isVisible = true;
    forceReRender();
  };
  return (
    <div>
      <Button onClick={onOpen}>Show Full Screen Dialog</Button>
      <FullScreenDialogImpl
        isVisible={isVisible}
        title={title}
        onClose={onClose}
      >
        {
          /* eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars */
          (renderProps: FullScreenDialogRenderProps): ReactNode => (
            <div>
              {content}
            </div>
          )
        }
      </FullScreenDialogImpl>
    </div>
  );
};

stories.add('Default', story);
