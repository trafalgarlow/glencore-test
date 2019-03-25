import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ColorsTable, { ColorsTableProps } from '../ColorsTable';
import ColorRow from '../ColorRow';
import { Color } from '../../color';

jest.mock('../ColorRow');

const color1: Color = { id: 1, name: 'color-1' };
const color2: Color = { id: 2, name: 'color-2' };
const colors: Color[] = [color1, color2];
let component: ShallowWrapper<ColorsTableProps>;

describe('ColorsTable', () => {
  beforeEach(() => {
    component = shallow<ColorsTableProps>(<ColorsTable colors={colors} />);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the ColorRow associated to the first color', () => {
    expect(component.find(ColorRow).at(0).prop('color')).toEqual(color1);
  });

  it('should render the ColorRow associated to the second color', () => {
    expect(component.find(ColorRow).at(1).prop('color')).toEqual(color2);
  });
});
