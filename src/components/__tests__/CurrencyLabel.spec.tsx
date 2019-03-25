import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography } from '@material-ui/core';
import { NumberUtils } from 'utils';
import CurrencyLabel from '../CurrencyLabel';

jest.mock('utils/number-utils');

let component: ShallowWrapper;

describe('CurrencyLabel', () => {
  beforeEach(() => {
    component = shallow(
      <CurrencyLabel
        currency="EUR"
        value={28}
      />,
    );
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the formatted currency', () => {
    expect(component.find(Typography).childAt(0).text()).toEqual('formatted 28 - EUR');
  });

  it('should call the formatCurrency method of NumberUtils', () => {
    expect(NumberUtils.formatCurrency).toHaveBeenCalledWith(28, 'EUR');
  });
});
