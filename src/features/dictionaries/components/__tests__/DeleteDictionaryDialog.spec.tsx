/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Color } from 'features/colors/color';
import { DictionariesContextValues } from '../../providers/DictionariesContext';
import DeleteDictionaryDialog, { DeleteDictionaryDialogProps } from '../DeleteDictionaryDialog';
import { Dictionary } from '../../dictionary';


const color: Color = { id: 2, name: 'color' };
const dictionary: Dictionary = { id: 1, from: 'from', to: 2 };

const mockGetDictionaryColor: jest.Mock = jest.fn().mockReturnValue(color);

const context: DictionariesContextValues = { getDictionaryColor: mockGetDictionaryColor } as any;
(DeleteDictionaryDialog as any).contextTypes = { getDictionaryColor: PropTypes.any };

let component: ShallowWrapper<DeleteDictionaryDialogProps>;

describe('DeleteDictionaryAlert', () => {
  beforeEach(() => {
    component = shallow<DeleteDictionaryDialogProps>(<DeleteDictionaryDialog
      dictionary={dictionary}
    />, { context: context as DictionariesContextValues });
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should call the getDictionaryColor method of context', () => {
    expect(mockGetDictionaryColor).toHaveBeenCalledWith(2);
  });

  it('should display the color you want to delete', () => {
    expect(component.find(Typography).at(1).childAt(0).text()).toEqual('from - color');
  });
});
