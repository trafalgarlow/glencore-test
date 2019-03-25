import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField } from '@material-ui/core';
import { NumberUtils } from 'utils';
import CurrencyTextField from '../CurrencyTextField';

jest.mock('utils/number-utils');

const mockOnChange = jest.fn().mockImplementation(() => {});

let component: ShallowWrapper;

describe('CurrencyTextField', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    component = shallow(
      <CurrencyTextField
        value={28}
        label="currency"
        onChange={mockOnChange}
      />,
    );
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the TextField', () => {
    expect(component.find(TextField)).toHaveLength(1);
  });

  it('should call the formatCurrency method of NumberUtils', () => {
    expect(NumberUtils.formatCurrency).toHaveBeenCalledWith(28, 'CHF');
  });

  describe('onChangeValue', () => {
    beforeEach(() => {
      component.find(TextField).simulate('change', { target: { value: '250' } });
    });

    it('should call the getCurrencyValueFromText method of NumberUtils', () => {
      expect(NumberUtils.getCurrencyValueFromText).toHaveBeenCalledWith('250');
    });

    it('should call the onChange prop when editing', () => {
      expect(mockOnChange).toHaveBeenCalledWith(250);
    });
  });
});
