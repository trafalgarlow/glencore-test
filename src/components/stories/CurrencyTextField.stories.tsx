import React from 'react';
import {
  storiesOf, Story, RenderFunction, forceReRender,
} from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import CurrencyTextField from '../CurrencyTextField';

const stories: Story = storiesOf('Currency Text Field', module);

let currentValue = 0;
const story: RenderFunction = (): JSX.Element => {
  const label = text('Label:', 'Text Field Label');
  const onChange = (val: number): void => {
    currentValue = val;
    action('val changed')(val);
    forceReRender();
  };
  return (
    <CurrencyTextField value={currentValue} label={label} onChange={onChange} />
  );
};

stories.add('Default', story);
