import React, { ProviderProps, ConsumerProps } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Product } from 'features/products/product';
import { ColorsContext } from 'features/colors/providers';
import { ColorsContextValues } from 'features/colors/providers/ColorsContext';
import { StringUtils } from 'utils';
import DictionariesContext, { DictionariesContextValues } from '../DictionariesContext';
import { DictionariesContextProviderUnconnected, DictionariesContextProviderProps } from '../DictionariesContextProvider';
import { Dictionary } from '../../dictionary';

jest.mock('../DictionariesContext');
jest.mock('features/colors/providers/ColorsContext');
jest.mock('utils');

const dictionary1: Dictionary = { id: 1, from: 'dictionary-1', to: 2 };
const dictionary2: Dictionary = { id: 2, from: 'dictionary-2', to: 1 };
const dictionaries: Dictionary[] = [dictionary1, dictionary2];

const mockAddDictionary: jest.Mock = jest.fn().mockImplementation(() => {});
const mockRemoveDictionary: jest.Mock = jest.fn().mockImplementation(() => {});
const mockUpdateDictionary: jest.Mock = jest.fn().mockImplementation(() => {});
const mockSelectDictionary: jest.Mock = jest.fn().mockImplementation(() => {});
const mockUnselectDictionary: jest.Mock = jest.fn().mockImplementation(() => {});

const product1: Product = {
  id: 1, name: 'product-1', price: 10, dictionary: 2,
};
const product2: Product = {
  id: 2, name: 'product-2', price: 20, dictionary: 1,
};
const products: Product[] = [product1, product2];

let component: ShallowWrapper<DictionariesContextProviderProps>;
let instance: DictionariesContextProviderUnconnected;
let colorsContextConsumer: ShallowWrapper<ConsumerProps<ColorsContextValues>>;
let dictionariesContextProvider: ShallowWrapper<ProviderProps<DictionariesContextValues>>;

describe('DictionariesContextProvider', () => {
  beforeEach(() => {
    component = shallow<DictionariesContextProviderProps>(
      <DictionariesContextProviderUnconnected
        dictionaries={dictionaries}
        products={products}
        selectedDictionary={null}
        addDictionary={mockAddDictionary}
        removeDictionary={mockRemoveDictionary}
        updateDictionary={mockUpdateDictionary}
        selectDictionary={mockSelectDictionary}
        unselectDictionary={mockUnselectDictionary}
      >
        content
      </DictionariesContextProviderUnconnected>,
    );
    instance = component.instance() as DictionariesContextProviderUnconnected;
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the ColorsContext.Consumer', () => {
    expect(component.find(ColorsContext.Consumer)).toHaveLength(1);
  });

  describe('Context Provider', () => {
    beforeEach(() => {
      colorsContextConsumer = component.find(ColorsContext.Consumer);
      dictionariesContextProvider = colorsContextConsumer.dive().find(DictionariesContext.Provider);
    });

    it('should be rendered', () => {
      expect(dictionariesContextProvider).toHaveLength(1);
    });

    it('should render the content', () => {
      expect(dictionariesContextProvider.childAt(0).text()).toEqual('content');
    });

    it('should provide the dictionaries', () => {
      expect(dictionariesContextProvider.props().value.dictionaries).toEqual(dictionaries);
    });

    it('should provide the selectedDictionary', () => {
      expect(dictionariesContextProvider.props().value.selectedDictionary).toBeNull();
    });

    it('should provide the addDictionary', () => {
      expect(dictionariesContextProvider.props().value.addDictionary).toEqual(mockAddDictionary);
    });

    it('should provide the removeDictionary', () => {
      expect(dictionariesContextProvider.props().value.removeDictionary).toEqual(mockRemoveDictionary);
    });

    it('should provide the updateDictionary', () => {
      expect(dictionariesContextProvider.props().value.updateDictionary).toEqual(mockUpdateDictionary);
    });

    it('should provide the selectDictionary', () => {
      expect(dictionariesContextProvider.props().value.selectDictionary).toEqual(mockSelectDictionary);
    });

    it('should provide the unselectDictionary', () => {
      expect(dictionariesContextProvider.props().value.unselectDictionary).toEqual(mockUnselectDictionary);
    });

    it('should provide the isFromAvailable', () => {
      expect(dictionariesContextProvider.props().value.isFromAvailable).toEqual(instance.isFromAvailable);
    });

    it('should provide the getAssociatedProducts', () => {
      expect(dictionariesContextProvider.props().value.getAssociatedProducts).toEqual(instance.getAssociatedProducts);
    });

    it('should provide the getDictionaryColor', () => {
      expect(dictionariesContextProvider.props().value.getDictionaryColor).toEqual(expect.any(Function));
    });

    it('should provide the getDictionaryById', () => {
      expect(dictionariesContextProvider.props().value.getDictionaryById).toEqual(instance.getDictionaryById);
    });
  });

  describe('isFromAvailable', () => {
    it('should call the areEquals method of StringUtils for each dictionary in the dictionaries list', () => {
      instance.isFromAvailable('from');
      expect(StringUtils.areEquals).toHaveBeenCalledTimes(2);
      expect(StringUtils.areEquals).toHaveBeenNthCalledWith(1, 'dictionary-1', 'from');
      expect(StringUtils.areEquals).toHaveBeenNthCalledWith(2, 'dictionary-2', 'from');
    });

    it('should return false if areEquals of StringUtils returns true', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(true);
      expect(instance.isFromAvailable('from')).toBeFalsy();
    });

    it('should return true if the dictionary from is not in the dictionaries list', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(false);
      expect(instance.isFromAvailable('not existent from')).toBeTruthy();
    });

    it('should return true if the dictionary from is in the dictionaries list but it is the same dictionary', () => {
      jest.spyOn(StringUtils, 'areEquals').mockImplementation((from: string) => from === 'dictionary-1');
      expect(instance.isFromAvailable('dictionary-1', 1)).toBeTruthy();
    });

    it('should return false if the dictionary from is in the dictionaries list but it is not the same dictionary', () => {
      jest.spyOn(StringUtils, 'areEquals').mockImplementation((from: string) => from === 'dictionary-1');
      expect(instance.isFromAvailable('dictionary-1', 5)).toBeFalsy();
    });
  });

  describe('getDictionaryById', () => {
    it('should return the dictionary with the given id', () => {
      expect(instance.getDictionaryById(1)).toEqual(dictionary1);
    });

    it('should return undefined if there is not a dictionary with the given id', () => {
      expect(instance.getDictionaryById(28)).toBeUndefined();
    });
  });

  describe('getAssociatedProducts', () => {
    it('should return an array of products with the given dictionary', () => {
      expect(instance.getAssociatedProducts(2)).toEqual([product1]);
    });

    it('should return an empty array if there are not of products with the given dictionary', () => {
      expect(instance.getAssociatedProducts(NaN)).toEqual([]);
    });
  });
});
