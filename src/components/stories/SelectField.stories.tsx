import React from 'react';
import {
  storiesOf, Story, RenderFunction, forceReRender,
} from '@storybook/react';
import { text, object, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SelectField, { OptionElement } from '../SelectField';

const stories: Story = storiesOf('Select Field', module);

let initialValue = 1;
const initialOptions: OptionElement[] = [
  { id: 1, label: 'First Value' },
  { id: 2, label: 'Second Value' },
  { id: 3, label: 'Third Value' },
];

const story: RenderFunction = (): JSX.Element => {
  const id = text('Id:', 'select-id');
  const label = text('Label:', 'Select Label');
  const isRequired = boolean('Is Required:', false);
  const options = object('Options:', initialOptions) as OptionElement[];
  const onRender = (item: OptionElement): string => item.label;
  const onSelect = (item: OptionElement): void => {
    action('Selected Element:')(item);
    initialValue = item.id;
    forceReRender();
  };
  return (
    <SelectField
      id={id}
      label={label}
      isRequired={isRequired}
      value={initialValue}
      options={options}
      onRender={onRender}
      onSelect={onSelect}
    />
  );
};

stories.add('Default', story);
