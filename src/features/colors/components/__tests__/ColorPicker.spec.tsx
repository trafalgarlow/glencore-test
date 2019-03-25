/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { ColorsContextValues } from 'features/colors/providers/ColorsContext';
import { SelectField } from 'components';
import ColorPicker, { ColorPickerProps } from '../ColorPicker';
import { Color } from '../../color';

jest.mock('components');

const mockOnSelectColor: jest.Mock = jest.fn().mockImplementation(() => {});
const color1: Color = { id: 1, name: 'color-1' };
const color2: Color = { id: 2, name: 'color-2' };
const context: ColorsContextValues = { colors: [color1, color2] } as any;
(ColorPicker as any).contextTypes = { colors: PropTypes.any };

let component: ShallowWrapper<ColorPickerProps>;
let instance: ColorPicker;

describe('ColorPicker', () => {
  beforeEach(() => {
    component = shallow<ColorPickerProps>(<ColorPicker
      onSelectColor={mockOnSelectColor}
    />, { context });
    instance = component.instance() as ColorPicker;
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('SelectField', () => {
    it('should be rendered', () => {
      expect(component.find(SelectField)).toHaveLength(1);
    });

    it('should render the 2 colors as options', () => {
      expect(component.find(SelectField).prop('options')).toEqual([color1, color2]);
    });

    it('should have the onSelect prop associted with the onSelect method', () => {
      expect(component.find(SelectField).prop('onSelect')).toEqual(instance.onSelect);
    });

    it('should call the onSelect method when changes', () => {
      jest.spyOn(instance, 'onSelect');
      component.update();
      instance.forceUpdate();
      component.find(SelectField).prop('onSelect')(color1);
      expect(instance.onSelect).toHaveBeenCalledWith(color1);
    });
  });

  describe('onSelect', () => {
    it('should call the onSelectColor prop', () => {
      instance.onSelect(color1);
      expect(mockOnSelectColor).toHaveBeenCalledWith(color1);
    });
  });
});
