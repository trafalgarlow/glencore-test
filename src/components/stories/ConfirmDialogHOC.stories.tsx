import React, { PureComponent, ReactNode } from 'react';
import { storiesOf, Story, RenderFunction } from '@storybook/react';
import { Button } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { text } from '@storybook/addon-knobs';
import withConfirmDialog, { WithConfirmDialogProps } from '../withConfirmDialog';
import markdown from './ConfirmDialogHOC.md';

interface SampleConfirmDialogHOCProps extends WithConfirmDialogProps{
  content: ReactNode;
  title: ReactNode;
}

class SampleConfirmDialogHOC extends PureComponent<SampleConfirmDialogHOCProps> {
  render(): ReactNode {
    const { confirmDialog, content, title } = this.props;

    return (
      <Button
        color="secondary"
        onClick={() => {
          confirmDialog({
            content: <div>{content}</div>,
            title: <div>{title}</div>,
            onConfirm: () => {
              // called when confirm button has been clicked
            },
          });
        }}
      >
          SHOW
      </Button>
    );
  }
}
const WithConfirmDialogComp = withConfirmDialog(SampleConfirmDialogHOC);

const stories: Story = storiesOf('Confirm Dialog', module);

const info = { text: <ReactMarkdown escapeHtml={false} source={markdown} /> };
const parameters = { info };

const story: RenderFunction = (): JSX.Element => {
  const title = text('title:', 'custom title');
  const content = text('content:', 'custom content');
  return <WithConfirmDialogComp title={title} content={content} />;
};
stories.add('withConfirmDialog', story, parameters);
