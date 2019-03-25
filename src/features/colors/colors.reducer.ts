import { ArrayUtils } from 'utils';
import { Color } from './color';
import { ColorAction, ColorActionType } from './colors.actions';


const colorsReducer = (state: Color[] = [], action: ColorAction): Color[] => {
  switch (action.type) {
    case ColorActionType.ADD:
      return state.concat({ ...action.color, id: ArrayUtils.findNextId(state) });
    default:
      return state;
  }
};

export default colorsReducer;
