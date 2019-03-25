/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { Typography, IconButton } from '@material-ui/core';
import { Color } from 'features/colors/color';
import { Product } from 'features/products/product';
import { DictionariesContextValues } from '../../providers/DictionariesContext';
import { DictionaryRow, DictionaryRowProps } from '../DictionaryRow';
import { Dictionary } from '../../dictionary';
import DeleteDictionaryAlert from '../DeleteDictionaryAlert';
import DeleteDictionaryDialog from '../DeleteDictionaryDialog';

jest.mock('components');
jest.mock('../DeleteDictionaryAlert');
jest.mock('../DeleteDictionaryDialog');

const color: Color = { id: 2, name: 'color' };
const dictionary: Dictionary = { id: 1, from: 'from', to: 2 };
const product1: Product = {
  id: 1, name: 'product-1', dictionary: 2, price: 10,
};
const product2: Product = {
  id: 2, name: 'product-2', dictionary: 1, price: 20,
};
const products: Product[] = [product1, product2];

const mockAlertDialog: jest.Mock = jest.fn().mockImplementation();
const mockConfirmDialog: jest.Mock = jest.fn().mockImplementation();

const mockGetDictionaryColor: jest.Mock = jest.fn().mockReturnValue(color);
const mockSelectDictionary: jest.Mock = jest.fn().mockImplementation();
const mockRemoveDictionary: jest.Mock = jest.fn().mockImplementation();
const mockGetAssociatedProducts: jest.Mock = jest.fn().mockReturnValue(products);

const context: DictionariesContextValues = {
  getDictionaryColor: mockGetDictionaryColor,
  selectDictionary: mockSelectDictionary,
  removeDictionary: mockRemoveDictionary,
  getAssociatedProducts: mockGetAssociatedProducts,
} as any;
(DictionaryRow as any).contextTypes = {
  getDictionaryColor: PropTypes.any,
  selectDictionary: PropTypes.any,
  removeDictionary: PropTypes.any,
  getAssociatedProducts: PropTypes.any,
};

let component: ShallowWrapper<DictionaryRowProps>;
let instance: DictionaryRow;

describe('DictionaryRow', () => {
  beforeEach(() => {
    component = shallow<DictionaryRowProps>(<DictionaryRow
      dictionary={dictionary}
      alertDialog={mockAlertDialog}
      confirmDialog={mockConfirmDialog}
    />, { context: context as DictionariesContextValues });
    instance = component.instance() as DictionaryRow;
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should call the getDictionaryColor context method', () => {
    expect(mockGetDictionaryColor).toHaveBeenCalledWith(2);
  });

  it('should render the dictionary from', () => {
    expect(component.find(Typography).at(0).childAt(0).text()).toEqual('from');
  });

  it('should render the color name', () => {
    expect(component.find(Typography).at(1).childAt(0).text()).toEqual('color');
  });

  it('should render the buttons for the two actions delete and update', () => {
    expect(component.find(IconButton)).toHaveLength(2);
  });

  it('should associate the onDeleteDictionary method to the onClick prop of the Delete button', () => {
    expect(component.find(IconButton).at(0).prop('onClick')).toEqual(instance.onDeleteDictionary);
  });

  it('should associate the onEditDictionary method to the onClick prop of the Edit button', () => {
    expect(component.find(IconButton).at(1).prop('onClick')).toEqual(instance.onEditDictionary);
  });

  describe('onConfirmDelete', () => {
    it('should call the removeDictionary context method', () => {
      instance.onConfirmDelete();
      expect(mockRemoveDictionary).toHaveBeenCalledWith(dictionary);
    });
  });

  describe('onDeleteDictionary', () => {
    beforeEach(() => {
      mockAlertDialog.mockReset();
      mockConfirmDialog.mockReset();
    });

    it('should call the getAssociatedProducts context method', () => {
      instance.onDeleteDictionary();
      expect(mockGetAssociatedProducts).toHaveBeenCalledWith(1);
    });

    describe('Products Associated', () => {
      beforeEach(() => {
        mockGetAssociatedProducts.mockReturnValue([product2]);
        instance.onDeleteDictionary();
      });

      it('should not call the confirmDialog prop', () => {
        expect(mockConfirmDialog).not.toHaveBeenCalled();
      });

      it('should call the alertDialog prop for displaying the alert that you cannot delete the current dictionary', () => {
        expect(mockAlertDialog).toHaveBeenCalled();
      });

      it('should display the alert title', () => {
        expect(mockAlertDialog).toHaveBeenCalledWith({
          title: 'Cannot delete the dictionary',
          content: expect.anything(),
        });
      });

      it('should display the alert content', () => {
        expect(mockAlertDialog).toHaveBeenCalledWith({
          title: expect.anything(),
          content: <DeleteDictionaryAlert dictionary={dictionary} products={[product2]} />,
        });
      });
    });

    describe('No Products Associated', () => {
      beforeEach(() => {
        mockGetAssociatedProducts.mockReturnValue([]);
        instance.onDeleteDictionary();
      });

      it('should not call the alertDialog prop', () => {
        expect(mockAlertDialog).not.toHaveBeenCalled();
      });

      it('should call the confirmDialog prop for displaying a confirm if you want to delete the current dictionary', () => {
        expect(mockConfirmDialog).toHaveBeenCalled();
      });

      it('should display the confirm title', () => {
        expect(mockConfirmDialog).toHaveBeenCalledWith({
          title: 'Confirm to delete the dictionary?',
          content: expect.anything(),
          onConfirm: expect.anything(),
        });
      });

      it('should display the confirm content', () => {
        expect(mockConfirmDialog).toHaveBeenCalledWith({
          title: expect.anything(),
          content: <DeleteDictionaryDialog dictionary={dictionary} />,
          onConfirm: expect.anything(),
        });
      });

      it('should pass the onConfirm method to the confirm dialog', () => {
        expect(mockConfirmDialog).toHaveBeenCalledWith({
          title: expect.anything(),
          content: expect.anything(),
          onConfirm: instance.onConfirmDelete,
        });
      });
    });
  });

  describe('onEditDictionary', () => {
    it('should call the selectDictionary context method', () => {
      instance.onEditDictionary();
      expect(mockSelectDictionary).toHaveBeenCalledWith(dictionary);
    });
  });
});
