import React, { PureComponent, ReactNode } from 'react';
import { storiesOf, Story, RenderFunction } from '@storybook/react';
import { Button } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { text, select, number } from '@storybook/addon-knobs';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { ToastMessageType } from 'components/ToastMessage';
import withToastMessage, { WithToastMessageProps } from '../withToastMessage';
import markdown from './ToastMessageHOC.md';

interface SampleToastMessageHOCProps extends WithToastMessageProps{
  message: ReactNode;
  position: SnackbarOrigin;
  autoHideDuration?: number;
  type?: ToastMessageType;
}

class SampleToastMessageHOC extends PureComponent<SampleToastMessageHOCProps> {
  onShow = (): void => {
    const {
      show, message, position, autoHideDuration, type,
    } = this.props;
    show({
      content: message, position, autoHideDuration, type,
    });
  };

  render(): ReactNode {
    const { hide } = this.props;

    return (
      <div>
        <Button color="secondary" onClick={this.onShow}>SHOW TOAST MESSAGE</Button>
        <Button color="secondary" onClick={hide}>HIDE</Button>
      </div>
    );
  }
}
const WithToastMessageComp = withToastMessage(SampleToastMessageHOC);

const stories: Story = storiesOf('Toast Message', module);

const info = { text: <ReactMarkdown escapeHtml={false} source={markdown} /> };
const parameters = { info };

const story: RenderFunction = (): JSX.Element => {
  const message = text('message:', 'custom message');
  const vertical = select('Vertical Position:', ['top', 'bottom'], 'top');
  const horizontal = select('Horizontal Position:', ['left', 'center', 'right'], 'center');
  const type = select('Type:', ['success', 'error', 'warning'], 'success') as ToastMessageType;
  const autoHideDuration = number('Auto Hide Duration:', 5000);
  return (
    <WithToastMessageComp
      autoHideDuration={autoHideDuration}
      message={message}
      type={type}
      position={{ vertical, horizontal }}
    />
  );
};
stories.add('withToastMessage', story, parameters);
