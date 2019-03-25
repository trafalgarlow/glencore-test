import { addColorAction, ColorActionType } from '../colors.actions';
import { ColorToInsert } from '../color';

describe('addColorAction', () => {
  it('should be a function', () => {
    expect(typeof addColorAction).toEqual('function');
  });

  it('should return the add action', () => {
    const color: ColorToInsert = { name: 'color' };
    expect(addColorAction(color)).toEqual({
      type: ColorActionType.ADD,
      color,
    });
  });
});
