import React, { Fragment } from 'react';
import {
  storiesOf, Story, RenderFunction, forceReRender,
} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@material-ui/core';
import { number, select, text } from '@storybook/addon-knobs';
import ToastMessage, { ToastMessageType } from '../ToastMessage';

const stories: Story = storiesOf('Toast Message', module);

let isOpen = true;
const story: RenderFunction = (): JSX.Element => {
  const autoHideDuration = number('Auto Hide Duration:', 5000);
  const vertical = select('Vertical Position:', ['top', 'bottom'], 'top');
  const horizontal = select('Horizontal Position:', ['left', 'center', 'right'], 'center');
  const type = select('Type:', ['success', 'error', 'warning'], 'success') as ToastMessageType;
  const content = text('Message Content:', 'Toast Message Content');
  const onClose = (): void => {
    isOpen = false;
    action('Triggered On Close')();
    forceReRender();
  };
  const onExited = (): void => {
    isOpen = false;
    action('Triggered On Exited')();
    forceReRender();
  };
  const onOpen = (): void => {
    isOpen = true;
    forceReRender();
  };
  return (
    <Fragment>
      <Button onClick={onOpen}>Show Toast Message</Button>
      <ToastMessage
        type={type}
        open={isOpen}
        autoHideDuration={autoHideDuration}
        position={{ vertical, horizontal }}
        onClose={onClose}
        onExited={onExited}
      >
        {content}
      </ToastMessage>
    </Fragment>
  );
};

stories.add('Default', story);
