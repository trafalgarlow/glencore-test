import React from 'react';
import {
  storiesOf, Story, RenderFunction, StoryDecorator, forceReRender,
} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ColorsContextProviderUnconnected } from '../../providers/ColorsContextProvider';
import { Color } from '../../color';
import ColorPicker from '../ColorPicker';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const addColor: any = (): void => {};

const color1: Color = { id: 1, name: 'First Color' };
const color2: Color = { id: 2, name: 'Second Color' };
const color3: Color = { id: 3, name: 'Third Color' };
const colors = [color1, color2, color3];

const withColorsContextDecorator: StoryDecorator = (story: RenderFunction): JSX.Element => (
  <ColorsContextProviderUnconnected colors={colors} addColor={addColor}>
    {story()}
  </ColorsContextProviderUnconnected>
);

let selectedColor = 1;
const story: RenderFunction = (): JSX.Element => {
  const onSelectColor: (color: Color) => void = (color: Color): void => {
    action('Selected Color')(color);
    selectedColor = color.id;
    forceReRender();
  };
  return (
    <ColorPicker value={selectedColor} onSelectColor={onSelectColor} />
  );
};

const stories: Story = storiesOf('Features.Colors', module)
  .addDecorator(withColorsContextDecorator);
stories.add('Color Picker', story);
