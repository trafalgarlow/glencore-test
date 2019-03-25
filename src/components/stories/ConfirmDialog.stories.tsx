import React from 'react';
import { storiesOf, Story, RenderFunction } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ConfirmDialog from '../ConfirmDialog';

const stories: Story = storiesOf('Confirm Dialog', module);

const story: RenderFunction = (): JSX.Element => {
  const isOpen = boolean('isOpen:', true);
  const title = text('title:', 'custom title');
  const content = text('content:', 'custom content');
  const onClose = action('triggered on close');
  const onConfirm = action('triggered on confirm');
  return (
    <ConfirmDialog isOpen={isOpen} title={title} onConfirm={onConfirm} onClose={onClose}>
      {content}
    </ConfirmDialog>
  );
};

stories.add('Default', story);
