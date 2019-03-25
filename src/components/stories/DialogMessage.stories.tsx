import React from 'react';
import { storiesOf, Story, RenderFunction } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Button } from '@material-ui/core';
import DialogMessage from '../DialogMessage';

const stories: Story = storiesOf('Dialog Message', module);

const story: RenderFunction = (): JSX.Element => {
  const isOpen = boolean('Is Open:', true);
  const content = text('Content:', 'Message Content');
  const title = text('Title:', 'Title');
  return (
    <DialogMessage
      isOpen={isOpen}
      title={title}
      closeElement={<Button onClick={action('close triggered')}>Close</Button>}
      confirmElement={<Button onClick={action('confirm triggered')}>Confirm</Button>}
      onClose={action('clicked on close')}
    >
      {content}
    </DialogMessage>
  );
};

stories.add('Default', story);
