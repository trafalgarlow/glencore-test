import { ColorToInsert } from './color';


enum ColorActionType {
  ADD = 'ADD_COLOR',
}

export interface ColorAction {
  type: ColorActionType;
  color: ColorToInsert;
}

export type AddColorActionType = (color: ColorToInsert) => ColorAction;

const addColorAction = (color: ColorToInsert): ColorAction => ({
  type: ColorActionType.ADD,
  color,
});

export {
  addColorAction,
  ColorActionType,
};
