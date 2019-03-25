export enum ColorActionType {
  ADD = 'ADD_COLOR',
};

export const addColorAction = jest.fn().mockReturnValue('add-color-action');
