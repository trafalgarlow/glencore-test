/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { ColorsContextValues } from 'features/colors/providers/ColorsContext';
import { Color } from 'features/colors/color';
import { AddColor, ColorsTable } from 'features/colors/components';
import ColorsRoute from '../ColorsRoute';

jest.mock('features/colors/components');

const color1: Color = { id: 1, name: 'color-1' };
const color2: Color = { id: 2, name: 'color-2' };
const colors: Color[] = [color1, color2];
const context: ColorsContextValues = { colors: [color1, color2] } as ColorsContextValues;
(ColorsRoute as any).contextTypes = { colors: PropTypes.any };

let component: ShallowWrapper<{}>;

describe('ColorsRoute', () => {
  beforeEach(() => {
    component = shallow<{}>(<ColorsRoute />, { context: context as ColorsContextValues });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should the AddColor', () => {
    expect(component.find(AddColor)).toHaveLength(1);
  });

  describe('ColorsTable', () => {
    it('should be rendered', () => {
      expect(component.find(ColorsTable)).toHaveLength(1);
    });

    it('should have as color prop the colors prop of the context', () => {
      expect(component.find(ColorsTable).prop('colors')).toEqual(colors);
    });
  });
});
