import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography } from '@material-ui/core';
import ColorRow, { ColorRowProps } from '../ColorRow';
import { Color } from '../../color';

const color: Color = { id: 1, name: 'color-1' };
let component: ShallowWrapper<ColorRowProps>;

describe('ColorRow', () => {
  beforeEach(() => {
    component = shallow<ColorRowProps>(<ColorRow color={color} />);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should dispay the color TableCell', () => {
    expect(component.find(Typography).childAt(0).text()).toEqual('color-1');
  });
});
