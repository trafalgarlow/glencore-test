import React, { ProviderProps } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ArrayUtils } from 'utils';
import ColorsContext, { ColorsContextValues } from '../ColorsContext';
import { ColorsContextProviderUnconnected, ColorsContextProviderProps } from '../ColorsContextProvider';
import { Color } from '../../color';

jest.mock('../ColorsContext');
jest.mock('utils');

const color1: Color = { id: 1, name: 'color-1' };
const color2: Color = { id: 2, name: 'color-2' };
const colors: Color[] = [color1, color2];
const mockAddColor: jest.Mock = jest.fn().mockImplementation(() => {});

let component: ShallowWrapper<ColorsContextProviderProps>;
let instance: ColorsContextProviderUnconnected;

describe('ColorsTable', () => {
  beforeEach(() => {
    component = shallow<ColorsContextProviderUnconnected>(
      <ColorsContextProviderUnconnected
        addColor={mockAddColor}
        colors={colors}
      >
        content
      </ColorsContextProviderUnconnected>,
    );
    instance = component.instance() as ColorsContextProviderUnconnected;
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('ColorsContext.Provider', () => {
    let colorsContextProvider: ShallowWrapper<ProviderProps<ColorsContextValues>>;
    beforeEach(() => {
      colorsContextProvider = component.find(ColorsContext.Provider);
    });

    it('should be rendered', () => {
      expect(colorsContextProvider).toHaveLength(1);
    });

    it('should render the content', () => {
      expect(colorsContextProvider.childAt(0).text()).toEqual('content');
    });

    it('should set the context values', () => {
      expect(colorsContextProvider.prop('value')).toEqual({
        colors,
        addColor: mockAddColor,
        getColorById: instance.getColorById,
        isColorNameNotAvailable: instance.isColorNameNotAvailable,
      });
    });
  });

  describe('getColorById', () => {
    it('should return the color by id', () => {
      expect(instance.getColorById(1)).toEqual(color1);
    });
  });

  describe('isColorNameNotAvailable', () => {
    it('should call the containsSameName method of ArrayUtils', () => {
      instance.isColorNameNotAvailable('new color');
      expect(ArrayUtils.containsSameName).toHaveBeenCalledWith(['color-1', 'color-2'], 'new color');
    });
  });
});
