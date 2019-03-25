import colorsReducer from '../colors.reducer';
import { ColorActionType } from '../__mocks__/colors.actions';
import { Color, ColorToInsert } from '../color';
import { ColorAction } from '../colors.actions';

jest.mock('utils');
jest.mock('../colors.actions');

describe('colorsReducer', () => {
  it('should be a function', () => {
    expect(typeof colorsReducer).toEqual('function');
  });

  it('should return the state if the action is not matched', () => {
    const color: object = {};
    const action: ColorAction = {
      type: ('' as ColorActionType),
      color: (color as Color),
    };
    expect(colorsReducer([], action)).toEqual([]);
  });

  it('should return the state with the new color', () => {
    const color: ColorToInsert = { name: 'color' };
    const action: ColorAction = {
      type: ColorActionType.ADD,
      color,
    };
    expect(colorsReducer([], action)).toEqual([color]);
  });
});
