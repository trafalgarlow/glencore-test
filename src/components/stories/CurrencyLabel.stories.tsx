import React from 'react';
import { storiesOf, Story, RenderFunction } from '@storybook/react';
import { number, select } from '@storybook/addon-knobs';
import CurrencyLabel from '../CurrencyLabel';

const stories: Story = storiesOf('Currency Label', module);

const withoutCurrency: RenderFunction = (): JSX.Element => {
  const value = number('Value:', 282323.32);
  return (
    <CurrencyLabel value={value} />
  );
};

const withCurrency: RenderFunction = (): JSX.Element => {
  const value = number('Value:', 11232.8);
  const currencyOptions = ['CHF', 'EUR', 'USD'];
  const currency = select('Currency:', currencyOptions, 'CHF');
  return (
    <CurrencyLabel value={value} currency={currency} />
  );
};

stories.add('With Currency', withCurrency);
stories.add('Without Currency', withoutCurrency);
