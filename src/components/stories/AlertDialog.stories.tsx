import React from 'react';
import { storiesOf, Story, RenderFunction } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import AlertDialog from '../AlertDialog';

const stories: Story = storiesOf('Alert Dialog', module);

const story: RenderFunction = (): JSX.Element => {
  const isOpen = boolean('isOpen:', true);
  const title = text('title:', 'custom title');
  const content = text('content:', 'custom content');
  const onClose = action('triggered on close');
  return (
    <AlertDialog isOpen={isOpen} title={title} onClose={onClose}>
      {content}
    </AlertDialog>
  );
};

stories.add('Default', story);
