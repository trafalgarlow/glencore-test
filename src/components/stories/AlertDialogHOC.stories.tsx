import React, { PureComponent, ReactNode } from 'react';
import { storiesOf, Story, RenderFunction } from '@storybook/react';
import { Button } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { text } from '@storybook/addon-knobs';
import withAlertDialog, { WithAlertDialogProps } from '../withAlertDialog';
import markdown from './AlertDialogHOC.md';

interface SampleAlertDialogHOCProps extends WithAlertDialogProps{
  content: ReactNode;
  title: ReactNode;
}

class SampleAlertDialogHOC extends PureComponent<SampleAlertDialogHOCProps> {
  render(): ReactNode {
    const { alertDialog, content, title } = this.props;

    return (
      <Button
        color="secondary"
        onClick={() => {
          alertDialog({
            content: <div>{content}</div>,
            title: <div>{title}</div>,
          });
        }}
      >
          SHOW ALERT DIALOG
      </Button>
    );
  }
}
const WithAlertDialogComp = withAlertDialog(SampleAlertDialogHOC);

const stories: Story = storiesOf('Alert Dialog', module);


const info = { text: <ReactMarkdown escapeHtml={false} source={markdown} /> };
const parameters = { info };

const story: RenderFunction = (): JSX.Element => {
  const title = text('title:', 'custom title');
  const content = text('content:', 'custom content');
  return <WithAlertDialogComp title={title} content={content} />;
};
stories.add('withAlertDialog', story, parameters);
